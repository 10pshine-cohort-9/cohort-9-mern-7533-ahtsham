# 0002 — Use MySQL with Prisma, not MongoDB

**Status:** Accepted
**Date:** 2026-07-28

## Context

The assignment brief is internally inconsistent about storage. The project
overview mentions "SQL database or MongoDB integration", while the required
technology list names **MySQL**, and the feature list says "MySQL or PostgreSQL
Database — design a database schema to store user information, Notes, and related
data".

Two of the three statements name a relational database, and the schema-design
requirement is a relational framing. A decision was needed before any data access
code was written, because it is not cheaply reversible.

The data itself is strongly relational: a note belongs to exactly one owner, and
notes are later shared with other users through a join table with permissions.
That is a foreign key and a many-to-many relationship, not a document tree.

## Decision

Use **MySQL 8** as the database and **Prisma** as the data access layer.

MySQL is named explicitly in the required technology list, so it satisfies the
brief under the strictest reading. Prisma provides a typed query API, first-class
migrations, and a schema file that doubles as documentation of the data model.

## Consequences

- Referential integrity is enforced by the database. A note cannot reference a
  user that does not exist, and `onDelete: Cascade` removes a user's notes
  automatically.
- Every schema change is a checked-in migration, so the evolution of the data
  model is visible in the git history.
- Prisma's generated types flow into the service layer, so a column rename
  becomes a compile error rather than a runtime failure.
- If the instructor requires MongoDB after all, this is a substantial rework:
  Prisma is replaced by Mongoose and the relational sharing model is redesigned.
  This is the main risk accepted by this decision.

## Alternatives considered

**MongoDB with Mongoose.** Matches the "MERN" label literally. Rejected because
the required-technology list names MySQL, the brief asks for schema design, and
note sharing is a genuine many-to-many relationship that a document store models
awkwardly.

**PostgreSQL.** Explicitly allowed by the feature list and arguably a better
database. Rejected only because MySQL is the one named in the required technology
list, and matching the stated requirement exactly is worth more here than a
marginal technical preference.

**Raw SQL or Knex.** Fewer abstractions, but no generated types and manual
migration management. Rejected because type safety across the service layer is
one of the main benefits being sought from TypeScript.
