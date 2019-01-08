# Model

All the models in the Positron Application are stored in `src/models`.

We are using **`TypeORM`** to implement seeding and migration of database.

Basic example
```ts
import * as DB from "typeorm"
import Base from "@positron/models/base"

@DB.Entity()
export default class Options extends Base{
	@DB.Column("varchar")
	public name !: string

	@DB.Column("simple-json")
	public value !:JSON
}
```

**IMPORTANT**
- All entities must extend `Base` entity from `@positron/models/base`
- this automatically implements the following into the new Entity
	- `id` - Primary Auto-Generated Integer
	- `createdAt` - Timestamp for created at 
	- `author` - The creator of a row
	- `lastModifiedAt` - Timestamp for latest modification
	- `lastModifier` - The last modifier
	- `modifications` - a list of all modifiers and their timing of modification, along with the modification