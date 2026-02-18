# Use Java 21
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper + project
COPY . .

# Build Spring Boot jar
RUN ./mvnw package -DskipTests

# Run app
CMD ["java", "-jar", "target/todo-0.0.1-SNAPSHOT.jar"]
