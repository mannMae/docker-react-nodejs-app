node {
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        steps {
            dir('frontend'){
                app = docker.build("mannmae/fullstack-frontend")
            }
        }
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}