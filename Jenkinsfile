pipeline {
    agent any
    
    tools {
        nodejs 
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build' 
            }
        }
        
        stage('Finalize') {
            steps {
                echo 'Build Success!'
                // You can add further steps here, like deploying artifacts or notifying teams
            }
        }
    }
}
