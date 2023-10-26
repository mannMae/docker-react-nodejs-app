def component = [
		React: true,
		Nodejs: true,
		Mysql: true,
]

pipeline {
	agent any
	stages {
		stage("Checkout") {
			steps {
				checkout scm
			}
		}
		stage("Build") {
			steps {
                script {
					component.each{ entry ->
						stage ("${entry.key} Build"){
							if(entry.value){
								var = entry.key
								sh "docker-compose build ${var.toLowerCase()}"
							}	
						}
					}
				}
			}
		}
		stage("Tag and Push") {
			steps {
                script {
					component.each{ entry ->
						stage ("${entry.key} Push"){
							if(entry.value){
								var = entry.key
								withCredentials([[$class: 'UsernamePasswordMultiBinding',
								credentialsId: 'docker_credentials',
								usernameVariable: 'DOCKER_USER_ID',
								passwordVariable: 'DOCKER_USER_PASSWORD'
								]]){
								sh "docker tag react-nodejs-mysql_${var.toLowerCase()}:latest ${DOCKER_USER_ID}/fullstack-${var.toLowerCase()}:${BUILD_NUMBER}"
								sh "docker login -u ${DOCKER_USER_ID} -p ${DOCKER_USER_PASSWORD}"
								sh "docker push ${DOCKER_USER_ID}/fullstack-${var.toLowerCase()}:${BUILD_NUMBER}"
								}
							}
						}
					}
				}
			}	
		}


		stage('K8S Manifest Update') {
            steps {
                sh "ls"
                sh 'mkdir -p gitOpsRepo'
                dir("gitOpsRepo")
                {
					echo 'start updating manifest !!'
                    git branch: "master",
                    credentialsId: 'github_credential2',
                    url: 'https://github.com/mannMae/k8s-cicd-prac.git'
					echo 'enter !!'

                    sh "sed -i 's/fullstack-react:.*\$/fullstack-react:${currentBuild.number}/g' react-deployment.yaml"
                    sh "sed -i 's/fullstack-nodejs:.*\$/fullstack-nodejs:${currentBuild.number}/g' node-deployment.yaml"
                    sh "sed -i 's/fullstack-mysql:.*\$/fullstack-mysql:${currentBuild.number}/g' mysql-deployment.yaml"
					echo 'sed !!'

                    sh "git add ."
					echo 'add !!'
                    sh "git commit -m '[UPDATE] k8s ${currentBuild.number} image versioning'"
					echo 'commit !!'
                    withCredentials([gitUsernamePassword(credentialsId: 'github_credential2',
                                     gitToolName: 'git-tool')]) {
	                    echo 'Credential !!'
                        sh "git remote set-url origin https://github.com/mannMae/k8s-cicd-prac"
	                    echo 'call remote !!'
                        sh "git push -u origin master"
	                    echo 'Push !!'
                    }
					echo 'Finish !!'
                }
            }
            post {
                    failure {
                      echo 'K8S Manifest Update failure !'
                    }
                    success {
                      echo 'K8S Manifest Update success !'
                    }
            }
        }
	}
}