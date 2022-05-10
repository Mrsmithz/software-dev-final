pipeline {
    agent any

    stages {
        stage('Pull code from branch main') {
            steps {
                git branch: 'main', url: 'https://github.com/Mrsmithz/software-dev-final.git'
            }
        }
        stage('Download Dependency for backend'){
            agent {
                docker 'node:16-alpine'
            }
            steps {
                dir('backend'){
                    sh 'yarn install'
                }
            }
        }
        stage('Download Dependency for frontend'){
            agent {
                docker 'node:16-alpine'
            }
            steps {
                dir('frontend'){
                    sh 'yarn install'
                }
            }
        }
        stage('Test for backend'){
            agent {
                docker 'node:16-alpine'
            }
            steps {
                dir('backend'){
                    sh 'yarn test'
                }
            }
        }
        stage('Test for frontend'){
            agent {
                docker 'node:16-alpine'
            }
            steps {
                dir('frontend'){
                    sh 'yarn test'
                }
            }
        }
    }
}