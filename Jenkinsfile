pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install' 
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build' 
                }
            }
        }
    }
}
