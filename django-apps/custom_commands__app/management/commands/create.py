from django.core.management.base import BaseCommand
from django.core.management import call_command
from core.settings import BASE_DIR
from pathlib import Path
from os import makedirs, remove


class Command(BaseCommand):
    def replace_django_default_directory(self, path: Path):
        file = Path(f"{path}.py")
        init_file_path = path.joinpath("__init__.py")

        if (file.exists()):
            remove(file)

        makedirs(path)

        with open(init_file_path, "w+", encoding="UTF-8"):
            pass

    def rewrite_apps(self, app_name, file_destination):
        origin: str
        new_content: str

        with open(file_destination, "r", encoding="UTF-8") as apps_file:
            origin = apps_file.read()
            new_content = origin.replace(app_name, f"apps.{app_name}")

        with open(file_destination, "w+", encoding="UTF-8") as new_apps_file:
            new_apps_file.write(new_content)



    def add_arguments(self, parser):
        parser.add_argument(
            nargs="+",
            type=str,
            dest="args"
        )

    def handle(self, *args, **options):
        new_app_name = f"{args[0]}__app"
        full_destination = Path(f"apps/{new_app_name}")
        apps_destination = Path(f"apps/{new_app_name}/apps.py")
        models_destination = Path(f"apps/{new_app_name}/models")
        admin_destination = Path(f"apps/{new_app_name}/admin")
        path = BASE_DIR / full_destination

        makedirs(path)
        call_command("startapp", new_app_name, full_destination)

        self.rewrite_apps(new_app_name, apps_destination)
        self.replace_django_default_directory(models_destination)
        self.replace_django_default_directory(admin_destination)
        

