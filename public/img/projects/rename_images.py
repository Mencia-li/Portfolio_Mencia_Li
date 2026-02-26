import os

# 🔹 PON AQUÍ TU CARPETA
FOLDER_PATH = r"4. 36 days of type"  # <-- cambia esto

def rename_images(folder_path):
    if not os.path.isdir(folder_path):
        print("❌ La ruta proporcionada no es una carpeta válida.")
        return

    for filename in os.listdir(folder_path):
        if filename.lower().endswith((".jpg", ".jpeg")):
            name, ext = os.path.splitext(filename)

            # Comprobar si termina en _v o _h
            if name.endswith("_v") or name.endswith("_h") or name.endswith("_c"):
                new_name = name[:-2] + ext  # Quitar las dos últimas letras
                old_path = os.path.join(folder_path, filename)
                new_path = os.path.join(folder_path, new_name)

                # Evitar sobreescribir archivos existentes
                if os.path.exists(new_path):
                    print(f"⚠️ Ya existe: {new_name}, se omite.")
                    continue

                os.rename(old_path, new_path)
                print(f"✅ Renombrado: {filename} -> {new_name}")

    print("\n✔ Proceso terminado.")

if __name__ == "__main__":
    rename_images(FOLDER_PATH)