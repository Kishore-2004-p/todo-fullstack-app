FROM maven:3.9.9-eclipse-temurin-21

WORKDIR /app

COPY . .

RUN mvn -q -e -DskipTests package

EXPOSE 8080

CMD ["java","-jar","target/todo-0.0.1-SNAPSHOT.jar"]
