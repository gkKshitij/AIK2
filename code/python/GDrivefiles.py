# import the required libraries
from __future__ import print_function
import pickle
import os.path
import io
import shutil
import requests
from mimetypes import MimeTypes
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload

class DriveAPI:
	global SCOPES
	#Creating fileids and filenames array to store ids and names of files
	fileids=[]
	filenames=[]
	# Define the scopes
	SCOPES = ['https://www.googleapis.com/auth/drive']

	def __init__(self):

		# Variable self.creds will
		# store the user access token.
		# If no valid token found
		# we will create one.
		self.creds = None

		# The file token.pickle stores the
		# user's access and refresh tokens. It is
		# created automatically when the authorization
		# flow completes for the first time.

		# Check if file token.pickle exists
		if os.path.exists('token.pickle'):

			# Read the token from the file and
			# store it in the variable self.creds
			with open('token.pickle', 'rb') as token:
				self.creds = pickle.load(token)

		# If no valid credentials are available,
		# request the user to log in.
		if not self.creds or not self.creds.valid:

			# If token is expired, it will be refreshed,
			# else, we will request a new one.
			if self.creds and self.creds.expired and self.creds.refresh_token:
				self.creds.refresh(Request())
			else:
				flow = InstalledAppFlow.from_client_secrets_file(
					'credentials.json', SCOPES)
				self.creds = flow.run_local_server(port=0)

			# Save the access token in token.pickle
			# file for future usage
			with open('token.pickle', 'wb') as token:
				pickle.dump(self.creds, token)

		# Connect to the API service
		self.service = build('drive', 'v3', credentials=self.creds)

		# request a list of first N files or
		# folders with name and id from the API.
		folderID = self.service.files().list(q="mimeType='application/vnd.google-apps.folder' and name='Spreadsheet'",
			pageSize=100, fields="files(id, name)").execute()
		folderIDResult = folderID.get('files', [])
		id = folderIDResult[0].get('id')
		results = self.service.files().list(q = "'" + id + "' in parents", pageSize=10, fields="nextPageToken, files(id, name)").execute()
		items = results.get('files', [])

		for f in range(0, len(items)):
			fId = items[f].get('id')
			fname = items[f].get('name')
			self.fileids.append(fId)
			self.filenames.append(fname)

		for file_id, file_name in zip(self.fileids, self.filenames):
			request = self.service.files().get_media(fileId=file_id)
			fh = io.BytesIO()
			downloader = MediaIoBaseDownload(fd = fh, request = request)
			done = False
			while not done:
				status, done = downloader.next_chunk()
				print('Download progress {0}'.format(status.progress()*100))
			fh.seek(0)

			with open(file_name, 'wb') as f:
				shutil.copyfileobj(fh, f)

if __name__ == "__main__":
	obj = DriveAPI()
