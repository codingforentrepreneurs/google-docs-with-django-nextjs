"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, AutoLink, Autosave, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './docEditor.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function DocEditor({ref, initialData, placeholder, onSave}) {
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: ['heading', 'bold', 'italic', 'underline', '|', 'link'],
					shouldNotGroupWhenFull: false
				},
				plugins: [AutoLink, Autosave, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline],
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				autosave: onSave ? {
					waitingTime: 5000,
					save: onSave,
				} : null,
				initialData: initialData ? initialData: '',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				placeholder: placeholder ? placeholder : 'Type or paste your content here!'
			}
		};
	}, [isLayoutReady]);

	return <div className='prose'>
		{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} ref={ref && ref} />}
	</div>
}
