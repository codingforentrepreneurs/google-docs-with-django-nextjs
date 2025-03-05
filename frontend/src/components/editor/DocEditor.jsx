"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, AutoLink, Autosave, BlockQuote, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline } from 'ckeditor5';
import { AIAssistant, AITextAdapter } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import './docEditor.css';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

class CustomerAITextAdapter extends AITextAdapter {
	async sendRequest ( requestData ) {
		const {query, context} = requestData
		console.log(context)

		requestData.onData(query)
	}
}


export default function DocEditor({ref, initialData, placeholder, onSave}) {
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const {data, isLoading} = useSWR('/api/ckeditor', fetcher)
	const license =  data?.license ? data?.license : 'GPL'
	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}
		if (isLoading) {
			return {};
		}

		return {
			editorConfig: {
				toolbar: {
					items: ['aiCommands', 'aiAssistant', '|','heading', 'bold', 'italic', 'underline', 'blockquote', '|', 'link'],
					shouldNotGroupWhenFull: false
				},
				plugins: [AIAssistant, CustomerAITextAdapter, AutoLink, Autosave, BlockQuote, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline],
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
				licenseKey: license,
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
	}, [isLayoutReady, isLoading]);

	return <div className='prose'>
		{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} ref={ref && ref} />}
	</div>
}
