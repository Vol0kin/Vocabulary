# Despliegue del microservicio en Heroku

```bash
sudo snap install heroku --classic
```

```bash
heroku login
```

![Login](img/heroku-cli-login.png)

```bash
heroku apps:create --region eu vocabulary-vi
```

Mover dependencias de gulp de dev a normales.

```bash
npm install gulp-cli
```

```bash
git push heroku master
```

![Default](img/heroku-deploy-default.png)

![Repo](img/heroku-deploy-repo.png)

![Integration](img/heroku-deploy-integracion.png)