job "cu-shotgun" {
  datacenters = ["cwdc-os-1"]

  group "server" {
    count = 1

    network {
      port  "http"{
        to = 80
      }
    }

    service {
      name = "cu-shotgun-http"
      port = "http"

      tags = [
        "traefik.enable=true",
        "traefik.http.routers.cushotgun.rule=Host(`cushotgun.ca`)",
      ]
    }

    task "server" {
      env {
        CONTACT_AUTH_USER = "example@hotmail.com"
        CONTACT_AUTH_PASS = "exampl"
        CONTACT_FROM  = "example@hotmail.com"
        CONTACT_TO    = "example@gmail.com"
      }

      driver = "docker"

      config {
        image = "ghcr.io/clarkbains/cushotgun"
        ports = ["http"]
      }
    }
  }
}
