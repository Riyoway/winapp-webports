"""Open the game through a local HTTP server."""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=0)
parser.add_argument('--no-browser', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

handler = functools.partial(Handler, directory=str(root))
with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
    url = f'http://127.0.0.1:{server.server_port}/index.html'
    print(f'Mario.EXE: {url}', flush=True)
    print('Keep this window open while playing. Press Ctrl+C to stop.', flush=True)
    if not args.no_browser:
        webbrowser.open(url, new=2)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
