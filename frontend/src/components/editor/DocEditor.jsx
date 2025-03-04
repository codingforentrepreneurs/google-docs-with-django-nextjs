"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph, Underline } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './docEditor.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function DocEditor({ref, initialData, placeholder}) {
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
					items: ['bold', 'italic', 'underline', '|', 'link'],
					shouldNotGroupWhenFull: false
				},
				plugins: [AutoLink, Autosave, Bold, Essentials, Italic, Link, Paragraph, Underline],
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

	return editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} ref={ref && ref} />
}
