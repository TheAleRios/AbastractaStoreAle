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
                git branch: 'main', url: 'https://github.com/TheAleRios/AbastractaStoreAle'
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

        stage('Generate Report') {
            steps {
                bat 'npm run generateReport'
                bat 'dir reports'
            }
        }

        stage('Publish Results') {
            steps {
                script {    
                        publishHTML(target: [
                            reportDir: 'reports',
                            reportFiles: 'cucumber_report.html',
                            reportName: 'Cucumber Test Report',
                            allowMissing: true
                        ])
                }
            }
        }
    }

    post {
        always {
            script {
                    archiveArtifacts artifacts: 'reports/*.html', fingerprint: true
            }
        }
    }
}