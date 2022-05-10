pipeline {
    agent {
        docker {
            image 'node:16-alpine'
         }
    }
    stages {
        stage('Pull code from branch main') {
            steps {
                git branch: 'main', url: 'https://github.com/Mrsmithz/software-dev-final.git'
            }
        }
        stage('Download Dependency for backend'){
            steps {
                dir('backend'){
                    sh 'yarn install'
                }
            }
        }
        stage('Test for backend'){
            steps {
                dir('backend'){
                    sh 'yarn test'
                }
            }
        }
        stage('Download Dependency for frontend'){
            steps {
                dir('frontend'){
                    sh 'yarn install'
                }
            }
        }
        stage('Test for frontend'){
            steps {
                dir('frontend'){
                    sh 'yarn test'
                }
            }
        }
        stage('deploy') {
            steps {
                script  {
                    def remote = [:]
                    remote.name = "root"
                    remote.host = '159.223.45.216'
                    remote.user = 'root'
                    remote.password = 'xitgmLwmp12q'
                    remote.allowAnyHosts = true
                    sshCommand remote: remote, command: "rm -rf software-dev-final"
                    sshCommand remote: remote, command: "git clone https://github.com/Mrsmithz/software-dev-final.git"
                    sshCommand remote: remote, command: "docker-compose -f ./software-dev-final/docker-compose.yaml up -d --build"
                    sshCommand remote: remote, command: "rm -rf software-dev-final"

                }
            }
        }
    }
}