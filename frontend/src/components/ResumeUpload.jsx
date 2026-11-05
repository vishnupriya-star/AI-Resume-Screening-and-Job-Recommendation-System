
import { useState } from "react"
import "./ResumeUpload.css"

function ResumeUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [education, setEducation] = useState("")
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  const [message, setMessage] = useState("")

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setMessage("Please select a PDF resume")
      return
    }

    const formData = new FormData()

    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("education", education)
    formData.append("experience", experience)
    formData.append("skills", skills)
    formData.append("resume_file", file)

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/resumes/",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage("Resume uploaded successfully!")

        setFile(null)
        setName("")
        setEmail("")
        setPhone("")
        setEducation("")
        setExperience("")
        setSkills("")

        e.target.reset()

        if (onUploadSuccess) {
          onUploadSuccess()
        }

      } else {
        setMessage(JSON.stringify(data))
      }

    } catch (error) {
      setMessage("Upload failed. Please try again.")
    }
  }

  return (
    <div className="resume-upload">
      <h2>Upload Resume</h2>

      <form onSubmit={handleUpload}>

        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Education"
          value={education}
          onChange={e => setEducation(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={e => setExperience(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Skills (Python, SQL, Django...)"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          required
        />

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={e => setFile(e.target.files[0])}
          required
        />

        <button type="submit">
          Upload Resume
        </button>

      </form>

      <p>{message}</p>
    </div>
  )
}

export default ResumeUpload
