pipeline {
    agent any
        
        stages {
            stage('Initialization Stage') {
                steps {
                    echo 'we are initializing bro ;-;'
                    echo 'Initial : Delete containers and images'
                    sh 'docker system prune -a'
                    sh 'docker compose down --rmi all --volumes || true'
                }
            }

            stage('Building Stage'){
                steps {
                    echo 'we are building bro ;-; xd '
                        sh "docker compose build"
                }
            }
            
            stage('Pushing Stage'){
                steps {
                    echo 'we are pushing bro ;-;'
                        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                            sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        }
                        sh 'docker push fixfireza/noteams-frontend:latest'
                }
            }
            
            stage('Trigger to slave job'){
                steps {
                    build job: 'SlaveJobFE'
                }
            }
        }
}
