import { moment, Plugin, TFile } from 'obsidian';
import { getAllDailyNotes, getDailyNote, createDailyNote } from 'obsidian-daily-notes-interface';

export default class DailyNoteUtils extends Plugin {
	api = {
		getDailyNote: (): TFile => {
			const now = moment();
			const allDailyNotes = getAllDailyNotes();
			const note = getDailyNote(now, allDailyNotes);
			return note;
		},

		logToDailyNote: (text: string): void => {
			const note = this.api.getDailyNote();
			const now = moment();
			this.app.vault.adapter.read(note.path)
			.then((noteData) => {
				const dateStr = now.format('HH:MM');
				noteData += `- **${dateStr}**: ${text}\n`;
				return this.app.vault.adapter.write(note.path, noteData);
			})
			.then((ret) => {
				console.log(ret);
			});
		}
	};

	async onload() {
		// @ts-ignore
		window.dailyNoteUtils = this.api;
	}
}
