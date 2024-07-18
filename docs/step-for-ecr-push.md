# Steps to push Docker images to ECR

### 1. Authenticate Docker client to ECR

```sh
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <accountId>.dkr.ecr.<region>.amazonaws.com
```

### 2. Create ECR repository

```sh
aws ecr create-repository \
--repository-name <repositoryName> \
--image-scanning-configuration scanOnPush=true \
--region <region>
```

### 3. Build Docker

```sh
docker build -t <repositoryName> .
```

### 4. Tag the image for ECR

```sh
docker tag <repositoryName>:latest <accountId>.dkr.ecr.<region>.amazonaws.com/<repositoryName>:latest
```

### 5. Push the image

```sh
docker push <accountId>.dkr.ecr.<region>.amazonaws.com/<repositoryName>:latest
```
