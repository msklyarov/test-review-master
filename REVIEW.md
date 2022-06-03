# 1. Check project npms:

```
yarn audit
```

```
76 vulnerabilities found - Packages audited: 1780
Severity: 2 Low | 13 Moderate | 45 High | 16 Critical
```

Better to switch to the new versions to fix vulnerabilities:

```
npm audit fix
```

or with --force flag

# 2. Better to choose between React Classes and Hooks and use only one approach if time allows to re-write code parts to one style
