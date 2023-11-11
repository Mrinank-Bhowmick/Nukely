resource "vercel_project" "example" {
  name      = "terraform-test-project"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "Mrinank-Bhowmick/NukeURL"
  }
}