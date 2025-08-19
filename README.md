# Scalability & Distributed System Considerations

## 1. Current Implementation
- Users are stored in an in-memory `Map`.
- This works for a single instance of the service but **does not scale horizontally**.
- All data is **lost on server restart**.

## 2. Scaling in a Distributed Environment
- To scale horizontally (multiple instances), in-memory storage must be replaced with a **distributed datastore** like DynamoDB, RDS, or Redis.
- Each service instance would read/write from the shared datastore to maintain **consistency**.

## 3. Data Consistency & Fault Tolerance
- Use a database with **ACID guarantees** for consistency (e.g., PostgreSQL).
- For high availability, deploy database replicas across multiple availability zones.
- Optionally use **Redis or DynamoDB with strong consistency mode** to cache frequently accessed data.
- Implement **retries and circuit breakers** to handle transient failures.

## 4. Load Balancing
- Deploy multiple instances of the service behind a **load balancer** (e.g., AWS ALB/ELB or NGINX).
- This allows traffic distribution and better **fault tolerance**.

## 5. Integration with AWS Services
- **EC2**: Deploy containerized Node.js service on EC2 instances (or ECS) with auto-scaling groups.
- **S3**: Store user-related files (attachments, logs) instead of keeping them in memory.
- **RDS/DynamoDB**: Persist user data for durability across instances.
- **Elasticache (Redis)**: Optional caching layer to reduce DB load.

## 6. Kubernetes Deployment
- Containerize the service using **Docker**.
- Deploy as **Pods** in a Kubernetes cluster.
- Use **Deployments + Horizontal Pod Autoscaler** to scale based on load.
- Use **ConfigMaps/Secrets** for configuration (e.g., JWT secret, DB connection).
- Use **Services + Ingress** for routing and load balancing.

## Summary
- In-memory `Map` is good for **prototyping** but not for production.
- Moving to a **distributed database**, adding **caching**, and deploying **multiple instances** with load balancing ensures:
  - Scalability
  - Fault tolerance
  - Data consistency
