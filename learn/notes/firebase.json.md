# firebase.json

[Exact copy](../original/firebase.json)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
{
```

Opens Firebase CLI configuration.

### Line 2

```text
  "firestore": {
```

Opens Firestore service configuration.

### Line 3

```text
    "rules": "firestore.rules"
```

Points Firebase CLI at firestore.rules for Firestore security rules deployment and emulator use.

### Line 4

```text
  },
```

Closes Firestore configuration.

### Line 5

```text
  "emulators": {
```

Opens local emulator configuration.

### Line 6

```text
    "auth": {
```

Opens the Authentication emulator settings.

### Line 7

```text
      "host": "127.0.0.1",
```

Binds Auth to loopback address 127.0.0.1, keeping it local to this computer.

### Line 8

```text
      "port": 9099
```

Uses port 9099 for the local Authentication emulator.

### Line 9

```text
    },
```

Closes Authentication settings.

### Line 10

```text
    "firestore": {
```

Opens the Firestore emulator settings.

### Line 11

```text
      "host": "127.0.0.1",
```

Binds Firestore emulator to loopback rather than a public network interface.

### Line 12

```text
      "port": 8080
```

Uses port 8080 for the local Firestore emulator.

### Line 13

```text
    },
```

Closes Firestore emulator settings.

### Line 14

```text
    "ui": {
```

Opens Firebase Emulator UI settings.

### Line 15

```text
      "enabled": false
```

Disables the Emulator UI; only configured service emulators run.

### Line 16

```text
    },
```

Closes Emulator UI settings.

### Line 17

```text
    "singleProjectMode": true
```

Enables single-project mode so configured emulators share one Firebase project context.

### Line 18

```text
  }
```

Closes emulator configuration.

### Line 19

```text
}
```

Closes Firebase configuration.
