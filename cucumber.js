module.exports = 
  {
    "default": {
      "require": [
        "tests/ui/support/hooks.ts",
        "tests/ui/step_definitions/**/*ts",
      ],
      "format": [
        "progress",
        "json:reports/cucumber-report.json",
      ],
    }
  }