pipeline {
    agent {
        label 'docker-builder'
    }

    environment {
        IMAGE = 'mrtol/tv-time'
        REGISTRY_CREDENTIALS = 'dockerhub'
        PRODUCTION_HOST = '172.31.46.67'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                script {
                    env.IMAGE_TAG = "${BUILD_NUMBER}"
                    env.GIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }

                sh '''
                    docker build \
                      -t ${IMAGE}:${IMAGE_TAG} \
                      -t ${IMAGE}:${GIT_SHORT} .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: REGISTRY_CREDENTIALS,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        set -e

                        echo "$DOCKER_TOKEN" | docker login \
                          -u "$DOCKER_USER" --password-stdin

                        docker push ${IMAGE}:${IMAGE_TAG}
                        docker push ${IMAGE}:${GIT_SHORT}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Production') {
            steps {
                sshagent(credentials: ['jenkins']) {
                    sh 'ssh-add -L'

                    sh '''
                        ssh -o BatchMode=yes \
                            -o StrictHostKeyChecking=yes \
                            ubuntu@${PRODUCTION_HOST} "
                                set -e

                                docker pull ${IMAGE}:${IMAGE_TAG}

                                docker rm -f tv-time || true

                                docker run -d \
                                  --name tv-time \
                                  --restart unless-stopped \
                                  -p 127.0.0.1:3000:80 \
                                  ${IMAGE}:${IMAGE_TAG}

                                docker ps --filter name=tv-time
                            "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'TV Time deployed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}
