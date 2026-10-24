# firestore.rules

[Exact copy](../original/firestore.rules)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
rules_version = '2';
```

Selects Firestore Rules language version 2, enabling the current recursive-match semantics.

### Line 2

```text
service cloud.firestore {
```

Opens the Cloud Firestore service rules block.

### Line 3

```text
  match /databases/{database}/documents {
```

Matches every database name and binds it to the variable database.

### Line 4

```text
    // Intentional shared-workspace mode: anyone can read and edit all Firestore data.
```

Comment states the intentional security posture: any caller may read and edit all data.

### Line 5

```text
    // This recursive rule covers every existing and future collection and subcollection.
```

Comment explains that the recursive wildcard covers current and future collections plus nested subcollections.

### Line 6

```text
    match /{document=**} {
```

Matches every document path below the selected database, including arbitrary depth.

### Line 7

```text
      allow read, write: if true;
```

Allows both read and write operations whenever the condition is true.

### Line 8

```text
    }
```

The literal true condition imposes no authentication or data restriction; this makes the entire Firestore database publicly readable and writable.

### Line 9

```text
  }
```

Closes the recursive document match.

### Line 10

```text
}
```

Closes the database match/service rules block.
