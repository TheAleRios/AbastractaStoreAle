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
        
        stage('Clean Reports Directory') {
     steps {
        bat 'del /Q reports\\*.*'
         }
            }

        stage('Run Tests') {
            steps {
                bat 'npm run test'
            }
        }
    }

    post {
    always {
        script {
            if (fileExists('reports/cucumber-report.json')) {
                cucumber 'reports/cucumber-report.json'
            } else {
                echo "Cucumber JSON not found"
            }
        }
    }
}
}