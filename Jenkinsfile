pipeline {
    agent any

    tools {
        nodejs "Node 18"  
    }

    environment {
        CI = 'true'  
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/TheAleRios/AbastractaStoreAle' 
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'  
                bat 'npx playwright install'  
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run test'  
            }
        }

        stage('Publish Results') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
        }
    }
}
