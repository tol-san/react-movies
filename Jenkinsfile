
pipeline {
    agent {
        label 'docker-builder'
    }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        IMAGE = 'mrtol/tv-time'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        PRODUCTION_SSH_CREDENTIALS = 'production-ssh'

        PRODUCTION_HOST = '172.31.46.67'
        PRODUCTION_USER = 'ubuntu'

        CONTAINER_NAME = 'tvtime'
        HOST_PORT = '3000'
        CONTAINER_PORT = '80'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm

                script {
                    env.GIT_SHORT = sh(
                        script: 'git rev-parse --short=12 HEAD',
                        returnStdout: true
                    ).trim()

                    env.IMAGE_TAG = "${BUILD_NUMBER}-${env.GIT_SHORT}"
                }
            }
        }

        stage('Build and Test') {
            steps {
                sh '''
                    set -eu
                    docker build \
                      --pull \
                      -t ${IMAGE}:${IMAGE_TAG} \
                      -t ${IMAGE}:latest \
                      .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: DOCKERHUB_CREDENTIALS,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu
                        echo "$DOCKER_TOKEN" | docker login \
                          --username "$DOCKER_USER" \
                          --password-stdin

                        docker push ${IMAGE}:${IMAGE_TAG}
                        docker push ${IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Production') {
            steps {
                sshagent(credentials: [PRODUCTION_SSH_CREDENTIALS]) {
                    sh '''
                        set -eu

                        ssh -o BatchMode=yes \
                            -o StrictHostKeyChecking=yes \
                            ${PRODUCTION_USER}@${PRODUCTION_HOST} \
                            "IMAGE='${IMAGE}' \
                             IMAGE_TAG='${IMAGE_TAG}' \
                             CONTAINER_NAME='${CONTAINER_NAME}' \
                             HOST_PORT='${HOST_PORT}' \
                             CONTAINER_PORT='${CONTAINER_PORT}' \
                             bash -s" <<'REMOTE_SCRIPT'
                        set -Eeuo pipefail

                        NEW_IMAGE="${IMAGE}:${IMAGE_TAG}"
                        OLD_IMAGE=""

                        if docker inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
                            OLD_IMAGE=$(docker inspect \
                                --format='{{.Config.Image}}' \
                                "$CONTAINER_NAME")
                        fi

                        echo "Pulling $NEW_IMAGE"
                        docker pull "$NEW_IMAGE"

                        rollback() {
                            echo "Deployment failed. Rolling back..."

                            docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

                            if [ -n "$OLD_IMAGE" ]; then
                                docker run -d \
                                    --name "$CONTAINER_NAME" \
                                    --restart unless-stopped \
                                    -p "127.0.0.1:${HOST_PORT}:${CONTAINER_PORT}" \
                                    "$OLD_IMAGE"
                            fi
                        }

                        docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

                        if ! docker run -d \
                            --name "$CONTAINER_NAME" \
                            --restart unless-stopped \
                            -p "127.0.0.1:${HOST_PORT}:${CONTAINER_PORT}" \
                            "$NEW_IMAGE"; then
                            rollback
                            exit 1
                        fi

                        HEALTHY=false

                        for attempt in $(seq 1 30); do
                            STATUS=$(docker inspect \
                                --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
                                "$CONTAINER_NAME" 2>/dev/null || true)

                            if [ "$STATUS" = "healthy" ] || [ "$STATUS" = "running" ]; then
                                HEALTHY=true
                                break
                            fi

                            if [ "$STATUS" = "unhealthy" ] || [ "$STATUS" = "exited" ]; then
                                break
                            fi

                            sleep 2
                        done

                        if [ "$HEALTHY" != "true" ]; then
                            docker logs "$CONTAINER_NAME" || true
                            rollback
                            exit 1
                        fi

                        echo "Deployment successful: $NEW_IMAGE"
                        REMOTE_SCRIPT
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'TV Time deployment completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}
