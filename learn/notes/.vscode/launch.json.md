# .vscode/launch.json

[Exact copy](../../original/.vscode/launch.json)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
{
```

Opens the launch-configuration JSON object.

### Line 2

```text
    // Use IntelliSense to learn about possible attributes.
```

Comment tells beginners that VS Code IntelliSense can suggest valid configuration attributes.

### Line 3

```text
    // Hover to view descriptions of existing attributes.
```

Comment says hovering an attribute can show its description in VS Code.

### Line 4

```text
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
```

Comment links to Microsoft’s debugger-configuration documentation.

### Line 5

```text
    "version": "0.2.0",
```

Sets the VS Code launch schema version to 0.2.0.

### Line 6

```text
    "configurations": [
```

Opens the array of debugger launch configurations.

### Line 7

```text
        {
```

Opens this individual launch configuration object.

### Line 8

```text
            "type": "editor-browser",
```

Selects the editor-browser debug adapter, which opens a page rather than Node or a native debugger.

### Line 9

```text
            "request": "launch",
```

Uses launch mode: start a new browser/debug session.

### Line 10

```text
            "name": "Open index.html",
```

Labels this configuration “Open index.html” in the VS Code run menu.

### Line 11

```text
            "url": "file:///c%3A/Users/Administrator/Projects/timekeeper/index.html"
```

Uses a Windows file URL pointing at index.html under the old Administrator project path; it is machine-specific and may not work in this Linux checkout.

### Line 12

```text
        }
```

Closes the configuration object.

### Line 13

```text
    ]
```

Closes the configurations array.

### Line 14

```text
}
```

Closes the root JSON object.
