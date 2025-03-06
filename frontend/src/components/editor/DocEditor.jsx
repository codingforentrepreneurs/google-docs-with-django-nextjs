"use client"

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CloudServices, ClassicEditor, AutoLink, Autosave, BlockQuote, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline } from 'ckeditor5';
import { PresenceList, RealTimeCollaborativeEditing, AIAssistant, AIRequestError, AITextAdapter } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';


import 'ckeditor5/ckeditor5.css';
import './docEditor.css';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const COLAB_PLUGINS = [
	CloudServices,
	PresenceList,
	RealTimeCollaborativeEditing

]

class CustomerAITextAdapter extends AITextAdapter {
	async sendRequest ( requestData ) {
		const {query, context} = requestData
		const endpoint = '/api/ai/'
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				query: query,
				context: context
			})
		}
		const apiR = await fetch(endpoint, options)
		if (!apiR.ok) {
			throw AIRequestError("The request failed for unknown reason")
		}
		const data = await apiR.json()
		requestData.onData(data.message)
	}
}

// /api/accounts/ckeditor/token/
const CLOUD_SERVICES_TOKEN_URL =
	'https://ad01wo2dm__n.cke-cs.com/token/dev/cfef2eb70dfcfd047a067464f456a01ba132626e078c41088531cf33b044?limit=10';
const CLOUD_SERVICES_WEBSOCKET_URL = 'wss://ad01wo2dm__n.cke-cs.com/ws';

export default function DocEditor({ref, initialData, placeholder, onSave, docId}) {
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const {data, isLoading} = useSWR('/api/ckeditor', fetcher)
	const editorPresenceRef = useRef(null)
	const license =  data?.license ? data?.license : 'GPL'
	
	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const fetchUserToken = async () => {
		const endpoint = '/api/accounts/ckeditor/token/'
		const options = {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}, 
		}
		const response = await fetch(endpoint, options)
		if (!response.ok) {
			throw new Error("Invalid token")
		}
		const data = await response.json()
		const {myUserToken} = data
		if (!myUserToken) {
			throw new Error("Invalid token")
		}
		return myUserToken
	}

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
				plugins: COLAB_PLUGINS.concat([AIAssistant, CustomerAITextAdapter, AutoLink, Autosave, BlockQuote, Bold, Essentials, Heading, Italic, Link, Paragraph, Underline]),
				cloudServices: {
					tokenUrl: fetchUserToken,
					webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL
				},
				collaboration: {
					channelId: `${docId}`,
				},
				presenceList: {
					container: editorPresenceRef.current
				},
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
		<div className="presence mb-2" ref={editorPresenceRef}></div>

		{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} ref={ref && ref} />}
	</div>
}
