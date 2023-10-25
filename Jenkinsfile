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

		stage('Deploy') {
			steps{
				sh("""
					git config --global user.name "mannMae"
					git config --global user.email "daga4242@gmail.com"
					git checkout -B master
				""")


				script {
					checkout([$class: 'GitSCM',
							branches: [[name: '*/master']],
							extensions: scm.extensions,
							userRemoteConfigs: [[
								url: 'https://github.com/mannMae/kubernetes-argo-cicd-prac-yaml'
							]]
					])
					previousTAG = sh(script: 'echo `expr ${BUILD_NUMBER} - 1`', returnStdout: true).trim()
					withCredentials([usernamePassword(credentialsId: 'github_credential2', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
						sh("""
							#!/usr/bin/env bash
							git config --local credential.helper "!f() { echo username=\\$GIT_USERNAME; echo password=\\$GIT_PASSWORD; }; f"
							echo ${previousTAG}
							sed -i 's/fullstack-frontend/fullstack-frontend:${BUILD_NUMBER}/g' react-nodejs-mysql/react-deployment.yaml
							git remote set-url origin https://github.com/mannMae/kubernetes-argo-cicd-prac-yaml
							git add .
							git status
							git commit -m "update deployment"
							git pull origin master
							git push -u origin master
						""")
					}
				}
			}
		}
	}
}