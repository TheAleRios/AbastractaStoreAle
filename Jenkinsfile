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
                git 'https://github.com/TheAleRios/AbastractaStoreAle'  // REPO CHANGE
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'  
                sh 'npx playwright install'  
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test'  
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
