
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/login": {
        "post": {
          "operationId": "SigaController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SigaLoginBody"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/profile": {
        "get": {
          "operationId": "SigaController_getStudentProfileContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/partial-grade": {
        "get": {
          "operationId": "SigaController_getStudentPartialGradeContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/partial-absences": {
        "get": {
          "operationId": "SigaController_getStudentPartialAbsencesContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/history": {
        "get": {
          "operationId": "SigaController_getStudentHistoryContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/schedule": {
        "get": {
          "operationId": "SigaController_getStudentScheduleContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      },
      "/student/notices": {
        "get": {
          "operationId": "SigaController_getNoticesContent",
          "parameters": [
            {
              "name": "authorization",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Estudante"
          ]
        }
      }
    },
    "info": {
      "title": "Fatequense API",
      "description": "API para acessar informações de estudantes da faculdade Fatec",
      "version": "v2.0.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "SigaLoginBody": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
