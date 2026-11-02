
pipeline {
    // Run this pipeline on a Jenkins agent (worker)
    // that has the label 'docker-builder'.
    agent {
        label 'docker-builder'
    }

    // Global environment variables accessible
    environment {
        IMAGE = 'mrtol/tv-time'                  // Docker Hub image name
        REGISTRY_CREDENTIALS = 'dockerhub'       // Jenkins credential ID for Docker Hub
        PRODUCTION_HOST = '172.31.46.67'         // Production server's private IP
    }

    // Automatically trigger the pipeline when GitHub
    // sends a push event to the configured webhook.
    triggers {
        githubPush()
    }

    stages {

        // ==========================================
        // Stage 1: Checkout Source Code
        // ==========================================
        stage('Checkout') {
            steps {
                // Retrieve source code from the configured SCM repository.
                // Uses the repository and branch configured for this job.
                checkout scm
            }
        }

        // ==========================================
        // Stage 2: Build Docker Image
        // ==========================================
        stage('Build Image') {
            steps {
                script {
                    // Use Jenkins BUILD_NUMBER as the Docker image tag.
                    // Example: 15
                    env.IMAGE_TAG = "${BUILD_NUMBER}"

                    // Get the short Git commit hash.
                    // This provides a unique reference to the source code version.
                    // Example: a1b2c3d
                    env.GIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }

                // Build the Docker image using the Dockerfile
                // in the repository's root directory.
                //
                // Create two tags for the same image:
                // 1. BUILD_NUMBER - Jenkins build version
                // 2. GIT_SHORT     - Git commit reference
                sh '''
                    docker build \
                      -t ${IMAGE}:${IMAGE_TAG} \
                      -t ${IMAGE}:${GIT_SHORT} .
                '''
            }
        }

        // ==========================================
        // Stage 3: Push Image to Docker Hub
        // ==========================================
        stage('Push to Docker Hub') {
            steps {

                // Retrieve Docker Hub credentials securely
                // from Jenkins Credentials.
                withCredentials([
                    usernamePassword(
                        credentialsId: REGISTRY_CREDENTIALS,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        # Stop execution if any command fails.
                        set -e

                        # Authenticate with Docker Hub.
                        # --password-stdin avoids exposing the token
                        # as a command-line argument.
                        echo "$DOCKER_TOKEN" | docker login \
                          -u "$DOCKER_USER" --password-stdin

                        # Push the Jenkins build-number tag.
                        docker push ${IMAGE}:${IMAGE_TAG}

                        # Push the Git commit tag.
                        docker push ${IMAGE}:${GIT_SHORT}

                        # Log out from Docker Hub after pushing.
                        docker logout
                    '''
                }
            }
        }

        // ==========================================
        // Stage 4: Deploy to Production Server
        // ==========================================
        stage('Deploy Production') {
            steps {

                // Load the SSH private key from Jenkins Credentials.
                // Credential ID: jenkins
                sshagent(credentials: ['jenkins']) {

                    // Display the public key loaded into the SSH agent.
                    // Useful for troubleshooting SSH authentication.
                    sh 'ssh-add -L'

                    sh '''
                        # Connect to the production server using SSH.
                        # BatchMode=yes prevents interactive password prompts.
                        # StrictHostKeyChecking=yes requires the server
                        # host key to already be trusted.
                        ssh -o BatchMode=yes \
                            -o StrictHostKeyChecking=yes \
                            ubuntu@${PRODUCTION_HOST} "

                                # Stop deployment if a command fails.
                                set -e

                                # Download the newly built image
                                # from Docker Hub to the production server.
                                docker pull ${IMAGE}:${IMAGE_TAG}

                                # Remove the existing container if it exists.
                                # || true prevents failure if no old container exists.
                                docker rm -f tv-time || true

                                # Start the new production container.
                                docker run -d \
                                  --name tv-time \
                                  --restart unless-stopped \
                                  -p 127.0.0.1:3000:80 \
                                  ${IMAGE}:${IMAGE_TAG}

                                # Verify that the container is running.
                                docker ps --filter name=tv-time
                            "
                    '''
                }
            }
        }
    }

    // ==========================================
    // Post-build Actions
    // ==========================================
    post {

        // Execute when all pipeline stages succeed.
        success {
            echo 'TV Time deployed successfully!'
        }

        // Execute when any pipeline stage fails.
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}
