# import subprocess
# import os
#
# from flask import Blueprint, jsonify
#
# pid = os.getpid()
# reload_bp = Blueprint('reloader', __name__)
#
#
# @reload_bp.post('/health')
# def health():
#     return jsonify({"message": "Server is running"}), 200
#
#
# @reload_bp.post('/pid')
# def get_pid():
#     return jsonify({"pid": pid}), 200
#
#
# @reload_bp.post('/reload')
# def reload():
#     print(pid)
#     # Execute git pull to update the code
#     try:
#         subprocess.run(["git", "pull"])
#     except subprocess.CalledProcessError:
#         print("Git pull failed")
#
#     try:
#         subprocess.run(["npm", "run", "build"])
#     except subprocess.CalledProcessError:
#         print("Could not build static folder")
#
#         try:
#             subprocess.run(["cp", "../client/dist/*", "static/."])
#         except subprocess.CalledProcessError:
#             print("Could not copy to static folder")
#
#     return jsonify({"message": "Code updated and server reloaded"}), 200
