import { FC, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'
import { GrMap } from 'react-icons/gr'
import { toastr } from 'react-redux-toastr'

import Layout from '@/components/layout/Layout'
import LoadingIndicator from '@/components/ui/loading-indicator/LoadingIndicator'

import { IErrorResponse } from '@/types/error-response.interface'

import styles from './Contacts.module.scss'
import { $ky } from '@/api/ky'

const Contacts: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [textAreaCurrentLength, setTextAreaCurrentLength] = useState(0)
	const TEXT_AREA_MAX_LENGTH = 1500

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		setIsLoading(true)

		const data = {
			name: event.target.name.value,
			email: event.target.email.value,
			subject: event.target.subject.value,
			message: event.target.message.value
		}

		try {
			const res = await $ky.post('contact/feedback/', {
				json: data
			})
			if (res.status === 200) {
				event.target.name.value = ''
				event.target.email.value = ''
				event.target.subject.value = ''
				event.target.message.value = ''
				toastr.success("Зворотній зв'язок", 'Повідомлення успішно відправлено')
			} else {
				const error = (await res.json()) as IErrorResponse
				toastr.error(error.message, '')
			}
		} catch {
			toastr.error(
				"Зворотній зв'язок",
				'Під час відправки повідомлення сталась непередбачена помилка'
			)
		}
		setIsLoading(false)
	}

	return (
		<Layout title={'Контакти'}>
			<div className={styles.head}>
				<h3>
					<span>Чікенбрест</span>
				</h3>
				<h2>
					<span>КОНТАКТИ</span>
				</h2>
			</div>
			<div className={styles.items}>
				<div>
					<FiPhoneCall />
					<h3>ТЕЛЕФОН:</h3>
					<p>(+380) 670-779-664</p>
				</div>
				<div>
					<GrMap />
					<h3>АДРЕСА:</h3>
					<p>
						вул. Нижня Берегова, 41, Старокостянтинівське ш., 3, Хмельницький,
						Хмельницька область, Україна, 29000
					</p>
				</div>
				<div>
					<AiOutlineMail />
					<h3>E-MAIL:</h3>
					<p>bazisc.qa@gmail.com</p>
				</div>
			</div>
			<div className={styles.form}>
				<div>
					<h1>
						<span>Чим ми можемо допомогти?</span>
					</h1>
					<p>
						<span>
							Ми дуже серйозно ставимося до коментарів і відповідаємо на кожен.
							Якщо ви бажаєте залишити свій відгук електронною поштою, заповніть
							форму нижче, і ми зв’яжемося з вами якомога швидше!
						</span>
					</p>
				</div>
				{!isLoading ? (
					<form onSubmit={handleSubmit}>
						<div>
							<input
								type='text'
								id='name'
								name='name'
								placeholder="Ім'я*"
								required
							/>
							<input
								type='email'
								id='email'
								name='email'
								placeholder='E-Mail*'
								required
							/>
						</div>
						<input
							type='text'
							id='subject'
							name='subject'
							placeholder='Тема*'
							required
						/>
						<textarea
							id='message'
							name='message'
							placeholder='Повідомлення*'
							maxLength={TEXT_AREA_MAX_LENGTH}
							onChange={(event: any) => {
								setTextAreaCurrentLength(event.target.value.length)
							}}
							required
						/>
						<div className={styles.textAreaIndicator}>
							{textAreaCurrentLength}/{TEXT_AREA_MAX_LENGTH}
						</div>
						<button type='submit'>Відправити</button>
					</form>
				) : (
					<LoadingIndicator />
				)}
			</div>
		</Layout>
	)
}

export default Contacts
