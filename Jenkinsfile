pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        script {
          sh 'cd frontend && npm install' // Change directory and install dependencies
        }
      }
    }
    stage('Build') {
      steps {
        script {
          sh 'npm run build' // Triggers build script defined in package.json
        }
      }
    }
  }
}
