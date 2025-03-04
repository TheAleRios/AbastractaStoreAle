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
                bat 'dir reports'
            }
        }

        stage('Publish Results') {
            steps {
                script {
                    def reportFile = 'reports/cucumber_report.html'
                    if (fileExists(reportFile)) {
                        echo "Report file found: ${reportFile}"
                        publishHTML(target: [
                            reportDir: 'reports',
                            reportFiles: 'cucumber_report.html',
                            reportName: 'Cucumber Test Report',
                            allowMissing: true
                        ])
                    } else {
                        echo "Report file not found: ${reportFile}"
                        error "No report file found: ${reportFile}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def files = findFiles(glob: 'reports/*.html')
                if (files.length > 0) {
                    echo "Found files: ${files}"
                    archiveArtifacts artifacts: 'reports/*.html', fingerprint: true
                } else {
                    echo "No files found with 'reports/*.html' pattern"
                }
            }
        }
    }
}
