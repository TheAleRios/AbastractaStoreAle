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
                    reportDir: 'reports',
                    reportFiles: 'cucumber_report.html',
                    reportName: 'Cucumber Test Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/cucumber_report.html', fingerprint: true
        }
    }
}