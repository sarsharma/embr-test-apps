# Node custom build command test app

End-to-end test app for Embr's **custom `buildCommand`** path, which runs through
Oryx via the `CUSTOM_BUILD_COMMAND` setting (Oryx prepares the platform
environment, then runs your command instead of its default install/build step).

## What this verifies

`embr.yaml` pins `platformVersion: "18"` (intentionally not the build image
default) and sets:

```yaml
buildCommand: "node --version && npm ci && npm run build"
```

In the build log you should see:

- `oryx build … --platform nodejs --platform-version 18 --skip-detection`
- `v18.x.x` from `node --version` → proves Oryx set up the requested SDK/PATH
  **before** running the custom command.
- `BUILD_RAN` → your custom command ran instead of Oryx's default `npm install`.

## Enforcement (negative test)

Remove `platform:` from `embr.yaml` (keep `buildCommand`) and redeploy — the Build
step should fail fast with: *"A custom buildCommand requires platform to be
specified…"*, and no sandbox build is attempted.

## Deploy

```bash
embr quickstart deploy <owner/repo> -i <installationId> -b node-custom-build-cmd
embr builds logs <buildId> -p <projectId> -e <environmentId>
```
