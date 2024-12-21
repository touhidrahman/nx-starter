import * as schema from './src/core/db/schema.ts'
import { pgGenerate } from 'drizzle-dbml-generator'

const out = './apps/example-server/schema.dbml'
const relational = true

pgGenerate({ schema, out, relational })
