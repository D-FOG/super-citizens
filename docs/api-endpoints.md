# Supersite Citizens API Endpoint Specifications

Backend service: Node.js + TypeScript. This document defines the REST contract required by the Next.js frontend. All protected endpoints require `Authorization: Bearer <accessToken>` unless marked public.

File storage is controlled by backend environment configuration. Use `STORAGE_PROVIDER=cloudinary` with `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to store uploaded files in Cloudinary. Use `STORAGE_PROVIDER=local` for local development uploads served from `/uploads`.

## Shared Conventions

Roles: `Cluster Supervisor`, `Cluster Leader`, `Cluster Member`, `Registered Partner`, `Field Evangelist`.

Default authenticated role: `Cluster Member`.

Common errors:

```json
{ "error": { "code": "UNAUTHORIZED", "message": "Authentication is required." } }
{ "error": { "code": "FORBIDDEN", "message": "You do not have permission to perform this action." } }
{ "error": { "code": "VALIDATION_ERROR", "message": "Request validation failed.", "fields": {} } }
{ "error": { "code": "NOT_FOUND", "message": "Resource not found." } }
```

Pagination query params where supported: `page`, `limit`, `search`, `sort`, `order`.

Pagination response:

```json
{ "data": [], "meta": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 } }
```

## Auth

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| POST | `/auth/register` | Create user account with default Cluster Member role. | Public | Public |
| GET/POST | `/auth/seed-admin` | Create the local development Cluster Supervisor seed account. Disabled in production. | Public | Public |
| POST | `/auth/login` | Authenticate and return access/refresh tokens. | Public | Public |
| POST | `/auth/refresh` | Refresh access token. | Refresh token | Any |
| POST | `/auth/logout` | Revoke refresh token. | Required | Any |
| GET | `/auth/me` | Return current profile, roles, permissions, assigned center. | Required | Any |

Register body: `{ "name": "string", "email": "string", "password": "string", "location": "string" }`.

Login body: `{ "email": "string", "password": "string" }`.

Auth response: `{ "user": { "id": "uuid", "name": "string", "email": "string", "roles": ["Cluster Member"] }, "accessToken": "jwt", "refreshToken": "jwt" }`.

## Users

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/users` | List users with search/filter/pagination. | Required | Cluster Supervisor |
| POST | `/users` | Create a user. | Required | Cluster Supervisor |
| GET | `/users/:id` | Get user detail. | Required | Self, Cluster Leader for assigned members, Cluster Supervisor |
| PATCH | `/users/:id` | Update profile or admin-managed fields. | Required | Self limited, Cluster Supervisor full |
| DELETE | `/users/:id` | Delete user. | Required | Cluster Supervisor |

Create/update body: `{ "name": "string", "email": "string", "phone": "string", "profession": "string", "location": "string", "clusterCenterId": "uuid" }`.

User response: `{ "id": "uuid", "name": "string", "email": "string", "roles": [], "profession": "string", "trainingLevel": "string", "certificationLevel": "string", "clusterCenter": {} }`.

## Roles

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/roles` | List assignable roles. | Required | Cluster Supervisor |
| PATCH | `/users/:id/roles` | Replace user roles. | Required | Cluster Supervisor |

Role body: `{ "roles": ["Cluster Leader", "Registered Partner"] }`.

## Cluster Centers

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/cluster-centers` | List centers; supports proximity search. | Required | Any |
| POST | `/cluster-centers` | Create center. | Required | Cluster Supervisor |
| GET | `/cluster-centers/:id` | Get center detail and leader contact. | Required | Any |
| PATCH | `/cluster-centers/:id` | Update center. | Required | Cluster Supervisor |
| DELETE | `/cluster-centers/:id` | Delete center. | Required | Cluster Supervisor |

Query params: `country`, `state`, `lat`, `lng`, `radiusKm`.

Body: `{ "name": "string", "address": "string", "state": "string", "country": "string", "latitude": 0, "longitude": 0, "leaderContact": "string" }`.

## Resources

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/resources` | List resources visible to current role. | Required | Any |
| POST | `/resources` | Upload video, PDF, or MP3 metadata/file. | Required | Cluster Supervisor |
| GET | `/resources/:id` | Get resource metadata. | Required | Visible role |
| GET | `/resources/:id/download` | Download resource. | Required | Visible role |
| PATCH | `/resources/:id` | Update metadata and visibility. | Required | Cluster Supervisor |
| DELETE | `/resources/:id` | Delete resource. | Required | Cluster Supervisor |

Create body multipart: `file`, `title`, `category`, `description`, `type`, `visibleTo[]`.

Response: `{ "id": "uuid", "title": "string", "type": "Video|PDF|MP3", "uploadedAt": "ISO date", "visibleTo": [] }`.

## Kingdom Academy

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/academy/overview` | Lessons, manuals, quizzes, exams, certificates summary. | Required | Any |
| GET | `/academy/lessons` | List video lessons. | Required | Any |
| POST | `/academy/lessons` | Create lesson. | Required | Cluster Supervisor |
| PATCH | `/academy/lessons/:id/progress` | Update lesson progress. | Required | Any enrolled user |
| GET | `/academy/manuals` | List manuals. | Required | Any |
| POST | `/academy/manuals` | Create manual. | Required | Cluster Supervisor |

Lesson body: `{ "title": "string", "description": "string", "thumbnailUrl": "string", "videoUrl": "string", "visibleTo": [] }`.

Progress body: `{ "progress": 72 }`.

## Quizzes

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/quizzes` | List quizzes and user progress. | Required | Any |
| POST | `/quizzes` | Create quiz. | Required | Cluster Supervisor |
| GET | `/quizzes/:id` | Get quiz questions. | Required | Any |
| POST | `/quizzes/:id/submissions` | Submit quiz answers. | Required | Any |
| PATCH | `/quizzes/:id` | Update quiz. | Required | Cluster Supervisor |
| DELETE | `/quizzes/:id` | Delete quiz. | Required | Cluster Supervisor |

Quiz body: `{ "title": "string", "questions": [{ "prompt": "string", "options": [], "correctOptionId": "string" }] }`.

Submission body: `{ "answers": [{ "questionId": "uuid", "optionId": "uuid" }] }`.

Submission response: `{ "score": 90, "correct": 9, "total": 10, "progress": 100 }`.

## Exams

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/exams` | List available exams. | Required | Any |
| POST | `/exams` | Create exam. | Required | Cluster Supervisor |
| GET | `/exams/:id/session` | Start or resume timed exam session. | Required | Eligible user |
| POST | `/exams/:id/submissions` | Submit exam. | Required | Eligible user |
| PATCH | `/exams/:id` | Update exam. | Required | Cluster Supervisor |
| DELETE | `/exams/:id` | Delete exam. | Required | Cluster Supervisor |

Exam body: `{ "title": "string", "durationMinutes": 45, "questions": [] }`.

Session response: `{ "sessionId": "uuid", "expiresAt": "ISO date", "questions": [] }`.

## Certificates

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/certificates` | List earned certificates. | Required | Any |
| POST | `/certificates` | Issue certificate. | Required | Cluster Supervisor |
| GET | `/certificates/:id/download` | Download certificate PDF. | Required | Owner, Cluster Supervisor |
| DELETE | `/certificates/:id` | Revoke certificate. | Required | Cluster Supervisor |

Issue body: `{ "userId": "uuid", "title": "string", "level": "string", "issuedAt": "ISO date" }`.

## Deployments

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/deployments/overview` | Outreach, projects, participation, impact reports. | Required | Any |
| GET | `/deployments/outreach` | List outreach activities. | Required | Any |
| POST | `/deployments/outreach` | Create outreach activity. | Required | Cluster Leader, Cluster Supervisor |
| PATCH | `/deployments/outreach/:id` | Update outreach status. | Required | Cluster Leader, Cluster Supervisor |
| GET | `/deployments/projects` | List community projects. | Required | Any |
| POST | `/deployments/projects` | Create project. | Required | Cluster Leader, Cluster Supervisor |
| PATCH | `/deployments/projects/:id` | Update project progress. | Required | Cluster Leader, Cluster Supervisor |

Activity body: `{ "name": "string", "date": "ISO date", "status": "Scheduled|In Progress|Complete", "clusterCenterId": "uuid" }`.

## Skills

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/skills/profiles` | Search skills database. | Required | Any |
| PATCH | `/skills/profiles/me` | Update own skills profile. | Required | Any |
| PATCH | `/skills/profiles/:userId` | Admin update user skills. | Required | Cluster Supervisor |

Query params: `search`, `category`, `trainingLevel`, `availability`, `profession`, `page`, `limit`.

Body: `{ "skills": [], "profession": "string", "trainingLevel": "string", "availability": "string", "category": "Technologists" }`.

## Certifications

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/certification-levels` | List certification levels and current user progress. | Required | Any |
| POST | `/certification-levels` | Create certification level. | Required | Cluster Supervisor |
| PATCH | `/certification-levels/:id` | Update level. | Required | Cluster Supervisor |
| DELETE | `/certification-levels/:id` | Delete level. | Required | Cluster Supervisor |
| POST | `/users/:id/certifications` | Mark certification complete. | Required | Cluster Supervisor |

Level body: `{ "name": "Kingdom Citizen", "order": 1, "requirements": [] }`.

## Communication

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/announcements` | List visible announcements. | Required | Any |
| POST | `/announcements` | Create announcement. | Required | Cluster Supervisor |
| PATCH | `/announcements/:id` | Update announcement. | Required | Cluster Supervisor |
| DELETE | `/announcements/:id` | Delete announcement. | Required | Cluster Supervisor |

Body: `{ "title": "string", "body": "string", "audienceRoles": [], "publishAt": "ISO date" }`.

## Prayer Networks

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/prayer-networks` | List prayer networks. | Required | Any |
| POST | `/prayer-networks` | Create prayer network. | Required | Cluster Leader, Cluster Supervisor |
| PATCH | `/prayer-networks/:id` | Update network. | Required | Cluster Leader, Cluster Supervisor |
| DELETE | `/prayer-networks/:id` | Delete network. | Required | Cluster Supervisor |

Body: `{ "title": "string", "schedule": "string", "clusterCenterId": "uuid" }`.

## Project Updates

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/project-updates` | List project updates. | Required | Any |
| POST | `/project-updates` | Create update. | Required | Cluster Leader, Cluster Supervisor |
| PATCH | `/project-updates/:id` | Update project update. | Required | Author, Cluster Supervisor |
| DELETE | `/project-updates/:id` | Delete project update. | Required | Cluster Supervisor |

Body: `{ "title": "string", "body": "string", "projectId": "uuid" }`.

## Attendance

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/attendance/me` | Current user's attendance history. | Required | Any |
| GET | `/attendance` | Attendance by meeting or center. | Required | Cluster Leader, Cluster Supervisor |
| POST | `/attendance/check-in` | Check into meeting, allowed only within 30 minutes from start time. | Required | Any |

Check-in body: `{ "meetingId": "uuid" }`.

Check-in response: `{ "id": "uuid", "meetingId": "uuid", "userId": "uuid", "date": "ISO date", "checkInTime": "ISO date" }`.

Check-in errors: `CHECK_IN_NOT_OPEN`, `ALREADY_CHECKED_IN`, `MEETING_NOT_FOUND`.

## Meetings

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/meetings` | List upcoming and past meetings. | Required | Any |
| POST | `/meetings` | Create meeting. | Required | Cluster Supervisor |
| PATCH | `/meetings/:id` | Update meeting. | Required | Cluster Supervisor |
| DELETE | `/meetings/:id` | Delete meeting. | Required | Cluster Supervisor |

Body: `{ "title": "string", "date": "ISO date", "startTime": "18:00", "clusterCenterId": "uuid" }`.

Response includes: `{ "checkInOpen": true, "checkInWindowMinutes": 30 }`.

## Partner Applications

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| POST | `/partner-applications` | Submit partner application. | Required | Any |
| GET | `/partner-applications` | List applications. | Required | Cluster Supervisor |
| GET | `/partner-applications/:id` | Get application. | Required | Owner, Cluster Supervisor |
| PATCH | `/partner-applications/:id/status` | Approve or reject. | Required | Cluster Supervisor |

Body: `{ "occupation": "string", "location": "string", "reason": "string", "skills": "string" }`.

Status body: `{ "status": "Approved|Rejected", "reviewNote": "string" }`.

## Leader Applications

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| POST | `/leader-applications` | Public leader application submission. | Public | Public |
| GET/POST | `/leader-applications/seed-leader` | Create the local development Cluster Leader seed account. Disabled in production. | Public | Public |
| GET | `/leader-applications` | List applications. | Required | Cluster Supervisor |
| GET | `/leader-applications/:id` | Get application. | Required | Applicant, Cluster Supervisor |
| PATCH | `/leader-applications/:id/status` | Approve or reject. | Required | Cluster Supervisor |

Body: `{ "personalInfo": {}, "background": "string", "location": {}, "skills": [], "callingInterests": "string" }`.

Response: `{ "id": "uuid", "status": "Pending", "submittedAt": "ISO date" }`.

## Reports

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/reports` | List leader reports. | Required | Cluster Leader own center, Cluster Supervisor all |
| POST | `/reports` | Submit weekly or monthly report. | Required | Cluster Leader, Cluster Supervisor |
| GET | `/reports/:id` | Get report. | Required | Author, Cluster Supervisor |
| PATCH | `/reports/:id` | Update draft report. | Required | Author |
| DELETE | `/reports/:id` | Delete draft report. | Required | Author, Cluster Supervisor |

Body: `{ "type": "Weekly|Monthly", "clusterCenterId": "uuid", "summary": "string", "metrics": {}, "challenges": "string", "needs": "string" }`.

## Assignments

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/assignments` | List assignments created by the leader, or all assignments for Cluster Supervisor. | Required | Cluster Leader, Cluster Supervisor |
| POST | `/assignments` | Create a member or cluster assignment. | Required | Cluster Leader, Cluster Supervisor |
| PATCH | `/assignments/:id` | Update assignment status, completion, due date, or assignee. | Required | Creator, Cluster Supervisor |
| DELETE | `/assignments/:id` | Delete assignment. | Required | Creator, Cluster Supervisor |

Body: `{ "title": "string", "description": "string", "dueDate": "ISO date", "assignedTo": "uuid", "clusterCenterId": "uuid", "status": "Open|In Progress|Complete", "completion": 0 }`.

## Leader Forums

Leader forums must never be returned to non-leader roles.

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/leader-forums/threads` | List private leader forum threads. | Required | Cluster Leader, Cluster Supervisor |
| POST | `/leader-forums/threads` | Create thread. | Required | Cluster Leader, Cluster Supervisor |
| GET | `/leader-forums/threads/:id` | Get thread and replies. | Required | Cluster Leader, Cluster Supervisor |
| POST | `/leader-forums/threads/:id/replies` | Reply to thread. | Required | Cluster Leader, Cluster Supervisor |
| DELETE | `/leader-forums/threads/:id` | Delete thread. | Required | Cluster Supervisor |

Thread body: `{ "title": "string", "body": "string" }`.

## Social Links

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/social-links` | List Pastor Joshua social links. | Public | Public |
| POST | `/social-links` | Create social link. | Required | Cluster Supervisor |
| PATCH | `/social-links/:id` | Update social link. | Required | Cluster Supervisor |
| DELETE | `/social-links/:id` | Delete social link. | Required | Cluster Supervisor |

Body: `{ "platform": "YouTube", "url": "https://...", "isActive": true, "order": 1 }`.

## Notifications

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/notifications` | List current user's notifications. | Required | Any |
| PATCH | `/notifications/:id/read` | Mark one notification read. | Required | Owner |
| PATCH | `/notifications/read-all` | Mark all read. | Required | Owner |

Notification response: `{ "id": "uuid", "title": "string", "body": "string", "read": false, "createdAt": "ISO date" }`.

## Admin

| Method | Route | Description | Auth | Roles |
| --- | --- | --- | --- | --- |
| GET | `/admin/overview` | Counts for users, centers, applications, resources, meetings, reports. | Required | Cluster Supervisor |
| GET | `/admin/audit-logs` | Administrative audit trail. | Required | Cluster Supervisor |
| POST | `/admin/uploads/sign` | Create signed upload URL for media/document uploads. | Required | Cluster Supervisor |

Signed upload body: `{ "fileName": "string", "contentType": "video/mp4|application/pdf|audio/mpeg", "folder": "resources|academy|certificates" }`.

Signed upload response: `{ "uploadUrl": "string", "assetUrl": "string", "expiresAt": "ISO date" }`.
