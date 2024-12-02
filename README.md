# Project Documentation

## Table of Contents

1. [Payment Processing with Cron Jobs](#payment-processing-with-cron-jobs)
2. [Course Update with Nested Modules and Videos](#course-update-with-nested-modules-and-videos)
3. [Dynamic Course Schema with Nested Modules and Videos in TypeScript](#dynamic-course-schema-with-nested-modules-and-videos-in-typescript)

---

## Payment Processing with Cron Jobs

### Objective
The objective of this task is to create a periodic payment processing system for users who have expired plans. The system checks if users' plans have expired and attempts to charge them automatically. If the payment is successful, their account status is updated to "active," and if the payment fails, the status is updated to "inactive."

### Key Steps

1. **User Model Setup**:
   - The `User` schema stores necessary information such as user details, payment method, plan start and end dates, and account status.
   - This model helps identify users whose plans have expired and need payment processing.

2. **Cron Job Scheduling**:
   - A cron job is scheduled to run every 24 hours at midnight.
   - It checks users whose plans have expired (`planEndDate` is less than the current date) and whose account status is "active."

3. **Payment Processing**:
   - The payment processing function interacts with the payment gateway (e.g., Authorize.Net) to charge the user's stored payment method.
   - The result of the payment determines the status of the user's account:
     - Success: User's status is set to "active."
     - Failure: User's status is set to "inactive."

4. **Handling Errors**:
   - Errors during payment processing are handled and logged.
   - If a payment fails or an unexpected error occurs, the user's status is set to "inactive."

5. **Manual Triggering**:
   - An API route is created to manually trigger the payment processing for testing or immediate execution.

---

## Course Update with Nested Modules and Videos

### Objective
This task enables updating a course that contains nested modules, each of which contains videos. The system supports partial updates, allowing modifications to specific parts of the course, such as adding/removing modules, and updating video details.

### Key Steps

1. **Course Schema with Nested Modules and Videos**:
   - The course model has a `modules` array, where each module contains a `videos` array. Each `video` has a title and URL, and each `module` has a name.
   - This nested structure organizes courses into modules and videos.

2. **Partial Updates**:
   - The system allows partial updates:
     - Add new modules.
     - Remove or update existing modules.
     - Add, update, or delete videos within modules.
   - The update logic ensures that existing content is updated and new content is added when necessary.

3. **Service Layer**:
   - The service function processes the course update, ensuring that the correct modules and videos are updated.
   - It handles adding new modules or videos and updating or removing existing ones.

4. **Controller**:
   - The controller receives the update request (via a PUT request) with the course ID and updated data.
   - It invokes the service layer to apply the updates and returns the updated course in the response.

5. **Validation and Error Handling**:
   - Data validation is performed to ensure the update request is valid.
   - If an error occurs, the system returns an appropriate error message and status code.

---

## Dynamic Course Schema with Nested Modules and Videos in TypeScript

### Objective
This task focuses on ensuring type safety when handling nested modules and videos in TypeScript. Using TypeScript interfaces and the Mongoose schema, the system ensures that updates to courses, modules, and videos are type-checked and errors are avoided.

### Key Steps

1. **Defining Interfaces**:
   - TypeScript interfaces define the structure of the course, modules, and videos:
     - `IVideo` defines the video structure with `title` and `url`.
     - `IModule` defines the module structure with `moduleName` and an array of `videos`.
     - `ICourse` defines the course structure with `title`, `description`, and an array of `modules`.

2. **Handling Updates with TypeScript**:
   - The update logic ensures that each module and video is updated correctly using the `_id` field.
   - TypeScript provides compile-time type safety, ensuring valid data is passed for updates.

3. **Mongoose Schema Integration**:
   - The Mongoose schema uses the TypeScript interfaces to ensure that data stored in the database matches the required structure.
   - Mongoose supports nested structures, allowing modules to contain videos.

4. **Service Layer**:
   - The service function handles the update logic, applying changes to the course document in the database.
   - TypeScript ensures that any modification to nested structures is type-checked, avoiding runtime errors.

5. **Controller for Handling Updates**:
   - The controller receives the update request, validates the data, and passes it to the service layer.
   - TypeScript ensures that the data passed to the service is of the correct type.

---

### Summary

In summary, these tasks involve:
1. **Payment Processing with Cron Jobs**: Automating payment processing for users with expired plans, updating their account status based on payment success or failure.
2. **Course Update with Nested Modules and Videos**: Enabling partial updates to courses, supporting the addition or modification of modules and videos.
3. **Dynamic Course Schema with TypeScript**: Ensuring type safety when handling nested modules and videos, and using TypeScript for better data validation and error prevention.

Each task emphasizes modular design, efficient handling of nested data structures, and robust error handling to ensure the system is maintainable and scalable.
