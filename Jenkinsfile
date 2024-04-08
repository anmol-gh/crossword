pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/GarvGopalia/crossword.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install' 
                }
            }
        }
        stage('Build/Test') {
            steps {
                script {
                    sh 'npm run build' 
                }
            }
        }
        stage('Deploy (Optional)') {
            when {
                expression {
                    branch == 'main'
                }
            }
            steps {
                sh 'scp -r dist/* user@host:/path/to/deployment/directory' 
            }
        }
    }
}
