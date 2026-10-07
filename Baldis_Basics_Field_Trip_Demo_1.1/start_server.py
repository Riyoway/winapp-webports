"""Serve the local game and open its normal entry page."""
import argparse, functools, webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--port',type=int,default=57322)
parser.add_argument('--no-browser',action='store_true')
args=parser.parse_args()
class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()
with ThreadingHTTPServer(('127.0.0.1',args.port),functools.partial(Handler,directory=str(Path(__file__).resolve().parent))) as server:
    url=f'http://127.0.0.1:{server.server_port}/index.html'
    print(url,flush=True)
    print('Keep this window open while playing. Press Ctrl+C to stop.',flush=True)
    if not args.no_browser:webbrowser.open(url,new=2)
    try:server.serve_forever()
    except KeyboardInterrupt:pass
