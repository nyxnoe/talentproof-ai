This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where line numbers have been added, content has been formatted for parsing in markdown style, security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Content has been formatted for parsing in markdown style
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
app/
  ambassador/
    components/
      AmbassadorBenefits.js
      AmbassadorForm.js
      AmbassadorHero.js
      AmbassadorHowItWorks.js
    page.js
  components/
    AmbassadorSection.js
    CategoriesSection.js
    FeaturedTripsSection.js
    Footer.js
    HeroSection.js
    Navbar.js
    WhyUsSection.js
  ride/
    [slug]/
      booking/
        page.js
      page.js
    page.js
  travel/
    [slug]/
      booking/
        page.js
      page.js
    components/
      TravelExpertCTA.js
      TravelGrid.js
      TravelHero.js
    page.js
  trek/
    [slug]/
      booking/
        page.js
      components/
        FAQSection.js
        TrekCTA.js
        TrekGallery.js
        TrekHero.js
        TrekMainContent.js
        TrekWhyUs.js
      page.js
    components/
      TravelExpertCTA.js
      TravelGrid.js
      TravelHero.js
      TrekGridIndex.js
      TrekHeroIndex.js
      TrekWhyUsIndex.js
    page.js
  favicon.ico
  globals.css
  layout.js
  page.js
common/
  components/
    BookingCard.js
    BookingForm.js
    FAQSection.js
  helper.js
  icons.js
public/
  img/
    payment-qrcode-2.jpeg
    payment-qrcode.jpeg
  next.svg
  vercel.svg
.gitignore
jsconfig.json
next.config.mjs
package.json
postcss.config.mjs
README.md
tailwind.config.js
```

# Files

## File: app/ambassador/components/AmbassadorBenefits.js
````javascript
 1: export default function AmbassadorBenefits() {
 2:   return (
 3:     <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
 4:       <div className="text-center mb-14">
 5:         <h2 className="text-3xl md:text-4xl font-black text-brand-black mb-4">
 6:           Why Become Our Ambassador?
 7:         </h2>
 8:         <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
 9:       </div>
10: 
11:       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
12:         {[
13:           { icon: '💰', title: 'Earn Commission', desc: 'Get up to 15% flat commission per successful booking you bring in.' },
14:           { icon: '🏞️', title: 'Free Trips', desc: 'Unlock fully sponsored trekking and travel experiences globally.' },
15:           { icon: '🏷️', title: 'Official Swag', desc: 'Receive an official certificate, branded jersey, and travel kits.' },
16:           { icon: '🤝', title: 'Community Growth', desc: 'Network with top creators, guides, and like-minded travelers.' }
17:         ].map((b, i) => (
18:           <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 text-center group">
19:             <span className="text-5xl block mb-6 group-hover:scale-110 transition-transform duration-300">{b.icon}</span>
20:             <h3 className="text-xl font-extrabold text-brand-black mb-3">{b.title}</h3>
21:             <p className="text-brand-gray font-medium text-sm leading-relaxed">{b.desc}</p>
22:           </div>
23:         ))}
24:       </div>
25:     </section>
26:   );
27: }
````

## File: app/ambassador/components/AmbassadorForm.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * app/ambassador/components/AmbassadorForm.js
  5:  * 
  6:  * =========================================================================
  7:  * GOOGLE APPS SCRIPT CODE — Paste this at script.google.com
  8:  * =========================================================================
  9:  * 
 10:  * function doPost(e) {
 11:  *   try {
 12:  *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 13:  *     var params = e.parameter;
 14:  * 
 15:  *     if (sheet.getLastRow() === 0) {
 16:  *       sheet.appendRow([
 17:  *         'Timestamp', 'Full Name', 'Email', 'Phone', 'Address', 
 18:  *         'Age', 'City', 'Profession', 'Why Ambassador', 
 19:  *         'Influence Reach', 'Preferred Role', 'Gov ID Proof Name', 'Terms Agreed'
 20:  *       ]);
 21:  *     }
 22:  * 
 23:  *     sheet.appendRow([
 24:  *       new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
 25:  *       params.name, params.email, params.phone, params.address,
 26:  *       params.age, params.city, params.profession, params.reason,
 27:  *       params.influence, params.role, params.idProof, params.agreed
 28:  *     ]);
 29:  * 
 30:  *     return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
 31:  *       .setMimeType(ContentService.MimeType.JSON);
 32:  *   } catch(err) {
 33:  *     return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
 34:  *       .setMimeType(ContentService.MimeType.JSON);
 35:  *   }
 36:  * }
 37:  * =========================================================================
 38:  */
 39: 
 40: import { useState, useRef } from 'react';
 41: import Link from 'next/link';
 42: 
 43: const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybc7GcQGoXMAy-kaFuUPPwhCEaOCQPrc7bo368X8Qo9qcqsDOii09BipWSSoKd6poipg/exec';
 44: 
 45: const initialForm = {
 46:   name: '',
 47:   email: '',
 48:   phone: '',
 49:   address: '',
 50:   age: '',
 51:   city: '',
 52:   profession: '',
 53:   reason: '',
 54:   influence: '',
 55:   role: '',
 56:   agreed: false
 57: };
 58: 
 59: export default function AmbassadorForm() {
 60:   const [form, setForm] = useState(initialForm);
 61:   const [file, setFile] = useState(null);
 62:   const [errors, setErrors] = useState({});
 63:   const [loading, setLoading] = useState(false);
 64:   const [success, setSuccess] = useState(false);
 65: 
 66:   const fileInputRef = useRef(null);
 67: 
 68:   const handleChange = (e) => {
 69:     const { name, value, type, checked } = e.target;
 70:     setForm(prev => ({
 71:       ...prev,
 72:       [name]: type === 'checkbox' ? checked : value
 73:     }));
 74:     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
 75:   };
 76: 
 77:   const handleFileChange = (e) => {
 78:     const selectedFile = e.target.files[0];
 79:     if (selectedFile) {
 80:       if (selectedFile.size > 5 * 1024 * 1024) {
 81:         setErrors(prev => ({ ...prev, file: 'File must be under 5MB' }));
 82:         setFile(null);
 83:         e.target.value = '';
 84:       } else {
 85:         setFile(selectedFile);
 86:         setErrors(prev => ({ ...prev, file: null }));
 87:       }
 88:     }
 89:   };
 90: 
 91:   const validate = () => {
 92:     const e = {};
 93:     if (!form.name.trim()) e.name = 'Full name is required';
 94:     if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email is required';
 95:     if (!form.phone.match(/^[0-9]{10}$/)) e.phone = 'Valid 10-digit mobile required';
 96:     if (!form.address.trim()) e.address = 'Address is required';
 97:     if (!form.age || form.age < 18) e.age = 'You must be at least 18';
 98:     if (!form.city.trim()) e.city = 'City is required';
 99:     if (!form.profession.trim()) e.profession = 'Profession is required';
100:     if (!form.reason.trim() || form.reason.length < 50) e.reason = 'Please provide a detailed reason (min 50 chars)';
101:     if (!form.influence) e.influence = 'Please select your reach';
102:     if (!form.role) e.role = 'Please select a preferred role';
103:     if (!file) e.file = 'Government ID proof is required';
104:     if (!form.agreed) e.agreed = 'You must agree to the terms';
105: 
106:     setErrors(e);
107:     return Object.keys(e).length === 0;
108:   };
109: 
110:   const handleSubmit = async (e) => {
111:     e.preventDefault();
112:     if (!validate()) return;
113:     
114:     setLoading(true);
115: 
116:     try {
117:       const payload = new URLSearchParams({
118:         name: form.name,
119:         email: form.email,
120:         phone: form.phone,
121:         address: form.address,
122:         age: form.age,
123:         city: form.city,
124:         profession: form.profession,
125:         reason: form.reason,
126:         influence: form.influence,
127:         role: form.role,
128:         idProof: file ? file.name : 'None',
129:         agreed: form.agreed ? 'Yes' : 'No'
130:       });
131: 
132:       console.log("Submitting formData:", Object.fromEntries(payload.entries()));
133:       console.log("Attached File:", file ? file.name : "None");
134: 
135:       // Send to Google Sheets
136:       await fetch(GOOGLE_SCRIPT_URL, {
137:         method: 'POST',
138:         mode: 'no-cors',
139:         body: payload
140:       });
141: 
142:       // Show success screen
143:       setSuccess(true);
144:       window.scrollTo({ top: document.getElementById('apply').offsetTop - 100, behavior: 'smooth' });
145: 
146:     } catch (err) {
147:       console.error(err);
148:       // Failsafe success for user experience even if cors blocks
149:       setSuccess(true);
150:     } finally {
151:       setLoading(false);
152:     }
153:   };
154: 
155:   if (success) {
156:     return (
157:       <section id="apply" className="py-24 bg-white px-4">
158:         <div className="max-w-2xl mx-auto text-center border-2 border-green-100 bg-green-50 rounded-3xl p-10 md:p-16 shadow-lg">
159:           <span className="text-7xl block mb-6 animate-bounce">🎉</span>
160:           <h2 className="text-3xl font-black text-brand-black mb-4">Application Submitted!</h2>
161:           <p className="text-lg text-brand-gray font-medium mb-8">
162:             Thank you for applying to be an Ambassador, <strong>{form.name}</strong>. Our team will review your application and Government ID within 48 hours and get back to you.
163:           </p>
164:           <Link href="/"
165:             className="inline-flex items-center gap-2 bg-brand-orange text-white font-black px-8 py-4 rounded-full shadow-orange-glow hover:bg-brand-orange-hover hover:scale-105 transition-all duration-300"
166:           >
167:             ← Return Home
168:           </Link>
169:         </div>
170:       </section>
171:     );
172:   }
173: 
174:   return (
175:     <section id="apply" className="py-20 bg-white">
176:       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
177:         
178:         <div className="text-center mb-10">
179:           <h2 className="text-3xl sm:text-4xl font-black text-brand-black mb-3">Apply as Ambassador Now</h2>
180:           <p className="text-brand-gray font-medium">Fill critical details clearly to verify your partner profile.</p>
181:         </div>
182: 
183:         <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-card p-6 sm:p-10 border border-gray-100">
184:           
185:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
186:             <div>
187:               <label className="block text-sm font-bold text-brand-black mb-2">Full Name <span className="text-red-500">*</span></label>
188:               <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="As per Govt ID" 
189:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
190:               {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
191:             </div>
192:             <div>
193:               <label className="block text-sm font-bold text-brand-black mb-2">Email Address <span className="text-red-500">*</span></label>
194:               <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" 
195:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
196:               {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
197:             </div>
198:           </div>
199: 
200:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
201:             <div>
202:               <label className="block text-sm font-bold text-brand-black mb-2">Phone Number <span className="text-red-500">*</span></label>
203:               <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" maxLength={10}
204:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.phone ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
205:               {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
206:             </div>
207:             <div>
208:               <label className="block text-sm font-bold text-brand-black mb-2">Age <span className="text-red-500">*</span></label>
209:               <input type="number" name="age" value={form.age} onChange={handleChange} min="18" placeholder="Must be 18+" 
210:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.age ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
211:               {errors.age && <p className="text-red-500 text-xs mt-1 font-medium">{errors.age}</p>}
212:             </div>
213:           </div>
214: 
215:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
216:             <div className="md:col-span-2">
217:               <label className="block text-sm font-bold text-brand-black mb-2">Home Address <span className="text-red-500">*</span></label>
218:               <textarea name="address" value={form.address} onChange={handleChange} rows="2" placeholder="Full permanent address" 
219:                 className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.address ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
220:               {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
221:             </div>
222:           </div>
223: 
224:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
225:             <div>
226:               <label className="block text-sm font-bold text-brand-black mb-2">City / Location <span className="text-red-500">*</span></label>
227:               <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai, Delhi" 
228:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.city ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
229:               {errors.city && <p className="text-red-500 text-xs mt-1 font-medium">{errors.city}</p>}
230:             </div>
231:             <div>
232:               <label className="block text-sm font-bold text-brand-black mb-2">Current Profession <span className="text-red-500">*</span></label>
233:               <input type="text" name="profession" value={form.profession} onChange={handleChange} placeholder="e.g. Student, Software Eng" 
234:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.profession ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
235:               {errors.profession && <p className="text-red-500 text-xs mt-1 font-medium">{errors.profession}</p>}
236:             </div>
237:           </div>
238: 
239:           <div className="mb-6">
240:             <label className="block text-sm font-bold text-brand-black mb-2">Why do you want to become an Ambassador? <span className="text-red-500">*</span></label>
241:             <textarea name="reason" value={form.reason} onChange={handleChange} rows="3" placeholder="Explain your motivation, travel history, and how you plan to help (100-200 words)" 
242:               className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:border-brand-orange outline-none transition-all ${errors.reason ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`} />
243:             {errors.reason && <p className="text-red-500 text-xs mt-1 font-medium">{errors.reason}</p>}
244:           </div>
245: 
246:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
247:             <div>
248:               <label className="block text-sm font-bold text-brand-black mb-2">How Many People Can You Influence? <span className="text-red-500">*</span></label>
249:               <select name="influence" value={form.influence} onChange={handleChange} 
250:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all cursor-pointer ${errors.influence ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`}
251:               >
252:                 <option value="">Select your reach</option>
253:                 <option value="0-50">0 - 50</option>
254:                 <option value="50-200">50 - 200</option>
255:                 <option value="200-500">200 - 500</option>
256:                 <option value="500+">500+</option>
257:               </select>
258:               {errors.influence && <p className="text-red-500 text-xs mt-1 font-medium">{errors.influence}</p>}
259:             </div>
260:             <div>
261:               <label className="block text-sm font-bold text-brand-black mb-2">Preferred Role <span className="text-red-500">*</span></label>
262:               <select name="role" value={form.role} onChange={handleChange} 
263:                 className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:border-brand-orange outline-none transition-all cursor-pointer ${errors.role ? 'border-red-400 bg-red-50' : 'bg-gray-50 border-gray-200'}`}
264:               >
265:                 <option value="">Select a role</option>
266:                 <option value="Trip Promoter">Trip Promoter</option>
267:                 <option value="Group Leader">Group Leader</option>
268:                 <option value="Content Creator">Content Creator</option>
269:                 <option value="Local Guide">Local Guide</option>
270:               </select>
271:               {errors.role && <p className="text-red-500 text-xs mt-1 font-medium">{errors.role}</p>}
272:             </div>
273:           </div>
274: 
275:           {/* File Upload section */}
276:           <div className="mb-8 border-t border-gray-100 pt-8">
277:             <h3 className="font-extrabold text-brand-black mb-1">Verify Your Identity</h3>
278:             <p className="text-xs text-brand-gray mb-4 font-medium">Upload Aadhaar, PAN, Passport, or DL (Max 5MB)</p>
279:             
280:             <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${file ? 'border-green-400 bg-green-50' : errors.file ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-brand-orange'}`}>
281:               <input 
282:                 type="file" 
283:                 ref={fileInputRef} 
284:                 onChange={handleFileChange} 
285:                 accept=".pdf, .jpg, .jpeg, .png" 
286:                 className="hidden" 
287:                 id="gov-id"
288:               />
289:               <label htmlFor="gov-id" className="cursor-pointer flex flex-col items-center">
290:                 <span className="text-3xl mb-2">{file ? '✅' : '📄'}</span>
291:                 <span className={`font-extrabold text-sm ${file ? 'text-green-700' : 'text-brand-black'}`}>
292:                   {file ? file.name : 'Click to Upload Government ID'}
293:                 </span>
294:                 {!file && <span className="text-xs text-brand-gray mt-1">PDF, JPG, PNG only</span>}
295:               </label>
296:             </div>
297:             {errors.file && <p className="text-red-500 text-xs mt-2 text-center font-medium">{errors.file}</p>}
298:           </div>
299: 
300:           <div className="flex items-center gap-3 mb-8">
301:             <input type="checkbox" id="agreed" name="agreed" checked={form.agreed} onChange={handleChange} className="w-5 h-5 cursor-pointer accent-brand-orange" />
302:             <label htmlFor="agreed" className="text-sm font-medium text-brand-black cursor-pointer">
303:               I agree to the <span className="text-brand-orange underline">Terms & Conditions</span> of the program and testify that my information is correct.
304:             </label>
305:           </div>
306:           {errors.agreed && <p className="text-red-500 text-xs -mt-6 mb-6 font-medium ml-8">{errors.agreed}</p>}
307: 
308:           <div className="text-center pt-4">
309:             <button type="submit" disabled={loading} className="w-full sm:w-auto px-12 py-4 bg-brand-orange hover:bg-brand-orange-hover hover:scale-[1.02] shadow-orange-glow transition-all duration-300 rounded-full text-white font-black text-lg disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2 mx-auto">
310:               {loading ? (
311:                 <>
312:                   <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
313:                   Submitting...
314:                 </>
315:               ) : 'Submit Application'}
316:             </button>
317:             <p className="text-xs text-brand-gray font-medium mt-4 flex items-center justify-center gap-1">
318:               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
319:                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
320:               </svg>
321:               Our team will review your application within 48 hours
322:             </p>
323:           </div>
324: 
325:         </form>
326:       </div>
327:     </section>
328:   );
329: }
````

## File: app/ambassador/components/AmbassadorHero.js
````javascript
 1: export default function AmbassadorHero() {
 2:   return (
 3:     <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
 4:       <div 
 5:         className="absolute inset-0 bg-cover bg-center" 
 6:         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1539634282855-33423b0980de?q=80&w=1600')` }}
 7:       />
 8:       {/* Dark overlay */}
 9:       <div className="absolute inset-0 bg-brand-black/60" />
10:       
11:       <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-10">
12:         <span className="inline-block bg-brand-orange/20 border border-brand-orange/50 text-brand-orange text-sm font-black px-5 py-2 rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm shadow-lg">
13:           Partner Program
14:         </span>
15:         <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-md">
16:           Travel & Earn <br className="hidden md:block" />
17:           <span className="text-brand-orange">with Us</span>
18:         </h1>
19:         <p className="text-lg md:text-2xl text-white/90 mb-10 font-medium max-w-2xl leading-relaxed">
20:           Become our Ambassador and turn your passion for travel into a steady income. Travel the world, inspire others, and get paid.
21:         </p>
22:         <a 
23:           href="#apply"
24:           className="px-8 py-4 bg-brand-orange text-white font-black text-lg rounded-full shadow-orange-glow transition-all duration-300 hover:scale-105 hover:bg-brand-orange-hover"
25:         >
26:           Apply Now 🚀
27:         </a>
28:       </div>
29:     </section>
30:   );
31: }
````

## File: app/ambassador/components/AmbassadorHowItWorks.js
````javascript
 1: export default function AmbassadorHowItWorks() {
 2:   return (
 3:     <section className="py-20 bg-gradient-to-b from-white to-brand-light border-y border-gray-100">
 4:       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 5:         <h2 className="text-3xl font-black text-center text-brand-black mb-16">
 6:           How It Works
 7:         </h2>
 8:         
 9:         <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
10:           {/* Connecting Line (Desktop) */}
11:           <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-blue-100 -z-10" />
12:           
13:           {[
14:             { step: '01', title: 'Apply & Get Approved', desc: 'Fill out the form below. We review applications within 48 hours.' },
15:             { step: '02', title: 'Share & Promote', desc: 'Get your unique referral code and share our trips with your network.' },
16:             { step: '03', title: 'Earn & Travel', desc: 'Receive payouts directly to your bank and unlock free premium trips!' }
17:           ].map((item, i) => (
18:             <div key={i} className="flex flex-col items-center text-center max-w-[280px]">
19:               <div className="w-24 h-24 bg-white rounded-full border-4 border-brand-orange shadow-orange-glow flex items-center justify-center text-2xl font-black text-brand-orange mb-6 bg-brand-light z-10">
20:                 {item.step}
21:               </div>
22:               <h3 className="text-xl font-extrabold text-brand-black mb-2">{item.title}</h3>
23:               <p className="text-brand-gray text-sm font-medium">{item.desc}</p>
24:             </div>
25:           ))}
26:         </div>
27:       </div>
28:     </section>
29:   );
30: }
````

## File: app/ambassador/page.js
````javascript
 1: import Navbar from '@/app/components/Navbar';
 2: import Footer from '@/app/components/Footer';
 3: 
 4: // Reusable Sections
 5: import AmbassadorHero from './components/AmbassadorHero';
 6: import AmbassadorBenefits from './components/AmbassadorBenefits';
 7: import AmbassadorHowItWorks from './components/AmbassadorHowItWorks';
 8: import AmbassadorForm from './components/AmbassadorForm';
 9: 
10: export const metadata = {
11:   title: 'Become an Ambassador — Travel • Trek • Ride',
12:   description: 'Turn your passion for travel into income. Get free trips, earn commissions, and join our elite community of Trip Promoters and Content Creators.',
13: };
14: 
15: export default function AmbassadorPage() {
16:   return (
17:     <>
18:       <Navbar />
19:       <main className="min-h-screen bg-brand-light font-sans">
20:         
21:         {/* 1. HERO SECTION */}
22:         <AmbassadorHero />
23: 
24:         {/* 2. BENEFITS SECTION */}
25:         <AmbassadorBenefits />
26: 
27:         {/* 3. HOW IT WORKS TIMELINE */}
28:         <AmbassadorHowItWorks />
29: 
30:         {/* 4. MAIN APPLICATION FORM (Client Component) */}
31:         <AmbassadorForm />
32: 
33:       </main>
34:       <Footer />
35:     </>
36:   );
37: }
````

## File: app/components/AmbassadorSection.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * AmbassadorSection — Full-width dark CTA to become an ambassador
  5:  * 'use client' for the button click interaction
  6:  */
  7: import Link from 'next/link';
  8: 
  9: export default function AmbassadorSection() {
 10:   return (
 11:     <section
 12:       id="ambassador"
 13:       className="relative py-16 sm:py-24 md:py-36 overflow-hidden bg-brand-black"
 14:       aria-labelledby="ambassador-heading"
 15:     >
 16:       {/* ── Background Image with overlay ── */}
 17:       <div className="absolute inset-0 z-0">
 18:         <img
 19:           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=70&auto=format&fit=crop"
 20:           alt="Community of travelers"
 21:           className="w-full h-full object-cover opacity-25"
 22:           loading="lazy"
 23:         />
 24:         <div className="absolute inset-0 bg-gradient-to-r
 25:                         from-brand-black via-brand-black/95 to-brand-blue-dark/80" />
 26:       </div>
 27: 
 28:       {/* ── Decorative elements ── */}
 29:       <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
 30:         {/* Large orange circle */}
 31:         <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10
 32:                         rounded-full blur-3xl" />
 33:         {/* Grid pattern */}
 34:         <div className="absolute inset-0 opacity-5"
 35:              style={{
 36:                backgroundImage: `radial-gradient(circle, #FF6B00 1px, transparent 1px)`,
 37:                backgroundSize: '30px 30px',
 38:              }} />
 39:       </div>
 40: 
 41:       {/* ── Content ── */}
 42:       <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 43: 
 44:         {/* Badge */}
 45:         <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40
 46:                         text-brand-orange text-sm font-bold px-5 py-2 rounded-full mb-8">
 47:           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
 48:             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 49:           </svg>
 50:           Ambassador Program
 51:         </div>
 52: 
 53:         {/* Main Heading */}
 54:         <h2
 55:           id="ambassador-heading"
 56:           className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white
 57:                      leading-tight mb-5"
 58:         >
 59:           Join as Ambassador{' '}
 60:           <span className="text-gradient-orange">&amp; Earn</span>
 61:         </h2>
 62: 
 63:         {/* Subtext */}
 64:         <p className="text-base sm:text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto mb-3">
 65:           Refer trips, lead groups, and earn up to{' '}
 66:           <span className="text-brand-orange font-extrabold">₹50,000/month</span>
 67:         </p>
 68:         <p className="text-white/50 font-medium text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-12">
 69:           Turn your passion for travel into a career. Join 500+ active ambassadors
 70:           already earning from their adventures.
 71:         </p>
 72: 
 73:         {/* Perks Grid */}
 74:         <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-2xl mx-auto">
 75:           {[
 76:             { icon: '💰', label: 'Earn Per Referral', val: '₹500–₹2,000' },
 77:             { icon: '👥', label: 'Lead Groups', val: 'Bonus ₹5,000' },
 78:             { icon: '✈️', label: 'Free Trip Credit', val: 'Every Quarter' },
 79:           ].map((perk) => (
 80:             <div key={perk.label}
 81:                  className="bg-white/5 backdrop-blur-sm border border-white/10
 82:                             rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-center">
 83:               <span className="text-2xl sm:text-3xl mb-2 block">{perk.icon}</span>
 84:               <p className="text-brand-orange font-black text-base sm:text-lg">{perk.val}</p>
 85:               <p className="text-white/60 text-xs font-medium mt-1">{perk.label}</p>
 86:             </div>
 87:           ))}
 88:         </div>
 89: 
 90:         {/* CTA Button */}
 91:         <Link
 92:           id="ambassador-cta-btn"
 93:           href="/ambassador"
 94:           className="btn-orange text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 shadow-orange-glow
 95:                      hover:shadow-2xl hover:shadow-orange-500/40 inline-flex items-center justify-center gap-2 sm:gap-3
 96:                      w-full xs:w-auto text-white rounded-full font-black transition-all duration-300 transform hover:scale-105"
 97:         >
 98:           <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 99:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
100:                   d="M13 10V3L4 14h7v7l9-11h-7z" />
101:           </svg>
102:           Become an Ambassador
103:         </Link>
104: 
105:         <p className="text-white/40 text-sm font-medium mt-5">
106:           Free to join • No upfront cost • Start earning immediately
107:         </p>
108:       </div>
109:     </section>
110:   );
111: }
````

## File: app/components/CategoriesSection.js
````javascript
  1: /**
  2:  * CategoriesSection — 3 adventure category cards (Travel / Trek / Ride)
  3:  * Each card links to its own page via Next.js Link
  4:  */
  5: import Link from "next/link";
  6: const CATEGORIES = [
  7:   {
  8:     id: "travel",
  9:     href: "/travel",
 10:     emoji: "🌍",
 11:     title: "Travel",
 12:     description:
 13:       "Discover iconic destinations across India and South Asia. Cultural immersions, heritage trails, and scenic road trips curated for the modern explorer.",
 14:     image:
 15:       "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80&auto=format&fit=crop",
 16:     tag: "Explore the World",
 17:     color: "from-blue-900/80 to-brand-blue/60",
 18:   },
 19:   {
 20:     id: "trek",
 21:     href: "/trek",
 22:     emoji: "🏔️",
 23:     title: "Trek",
 24:     description:
 25:       "Conquer the Himalayas on foot. Guided treks from beginner trails to high-altitude expeditions — Hampta Pass, Kedarkantha, and beyond.",
 26:     image:
 27:       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop",
 28:     tag: "Conquer the Peaks",
 29:     color: "from-gray-900/80 to-brand-black/60",
 30:   },
 31:   {
 32:     id: "ride",
 33:     href: "/ride",
 34:     emoji: "🏍️",
 35:     title: "Ride",
 36:     description:
 37:       "Fuel your two-wheeled wanderlust. Epic motorcycle expeditions — Leh Ladakh, Spiti Valley, Northeast India — with expert riders by your side.",
 38:     image:
 39:       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
 40:     tag: "Ride Into the Wild",
 41:     color: "from-orange-900/80 to-brand-orange/40",
 42:   },
 43: ];
 44: 
 45: export default function CategoriesSection() {
 46:   return (
 47:     <section id="categories" className="py-20 md:py-28 bg-brand-light">
 48:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 49:         {/* ── Section Header ── */}
 50:         <div className="text-center mb-14">
 51:           <span
 52:             className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
 53:                            px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase"
 54:           >
 55:             What We Offer
 56:           </span>
 57:           <h2 className="section-heading mb-4">Choose Your Adventure</h2>
 58:           <p className="text-brand-gray font-medium text-lg max-w-xl mx-auto">
 59:             Three ways to experience India like never before. Pick your vibe.
 60:           </p>
 61:         </div>
 62: 
 63:         {/* ── Cards Grid ── */}
 64:         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
 65:           {CATEGORIES.map((cat, idx) => (
 66:             <Link
 67:               key={cat.id}
 68:               href={cat.href}
 69:               id={`category-${cat.id}-card`}
 70:               className="group relative rounded-3xl overflow-hidden cursor-pointer
 71:                          shadow-card hover:shadow-card-hover
 72:                          transition-all duration-500 hover:scale-[1.03]
 73:                          block focus:outline-none focus:ring-4 focus:ring-brand-orange/40"
 74:               style={{ animationDelay: `${idx * 0.1}s` }}
 75:               aria-label={`Explore ${cat.title} adventures`}
 76:             >
 77:               {/* Card Image */}
 78:               <div className="relative h-80 md:h-96 overflow-hidden">
 79:                 <img
 80:                   src={cat.image}
 81:                   alt={`${cat.title} adventure background`}
 82:                   className="w-full h-full object-cover rounded-3xl transition-transform duration-700
 83:                              group-hover:scale-110"
 84:                   loading="lazy"
 85:                 />
 86:                 {/* Gradient overlay */}
 87:                 <div
 88:                   className={`absolute inset-0 bg-gradient-to-t ${cat.color}`}
 89:                 />
 90:               </div>
 91: 
 92:               {/* Card Content (overlaid on image) */}
 93:               <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
 94:                 {/* Tag badge */}
 95:                 <span
 96:                   className="inline-block bg-white/15 backdrop-blur-sm border border-white/20
 97:                                  text-white text-xs font-semibold px-3 py-1 rounded-full mb-3
 98:                                  w-fit"
 99:                 >
100:                   {cat.tag}
101:                 </span>
102: 
103:                 {/* Emoji + Title */}
104:                 <div className="flex items-center gap-3 mb-2">
105:                   <span className="text-4xl" role="img" aria-label={cat.title}>
106:                     {cat.emoji}
107:                   </span>
108:                   <h3 className="text-3xl font-black text-white">
109:                     {cat.title}
110:                   </h3>
111:                 </div>
112: 
113:                 {/* Description */}
114:                 <p
115:                   className="text-white/80 text-sm font-medium leading-relaxed
116:                               max-h-0 overflow-hidden opacity-0
117:                               transition-all duration-500
118:                               group-hover:max-h-24 group-hover:opacity-100"
119:                 >
120:                   {cat.description}
121:                 </p>
122: 
123:                 {/* Arrow CTA */}
124:                 <div
125:                   className="flex items-center gap-2 mt-3 text-brand-orange font-bold text-sm
126:                                 translate-y-2 opacity-0 transition-all duration-300
127:                                 group-hover:translate-y-0 group-hover:opacity-100"
128:                 >
129:                   Explore {cat.title}
130:                   <svg
131:                     className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
132:                     fill="none"
133:                     stroke="currentColor"
134:                     viewBox="0 0 24 24"
135:                   >
136:                     <path
137:                       strokeLinecap="round"
138:                       strokeLinejoin="round"
139:                       strokeWidth={2.5}
140:                       d="M13 7l5 5m0 0l-5 5m5-5H6"
141:                     />
142:                   </svg>
143:                 </div>
144:               </div>
145: 
146:               {/* Orange border on hover */}
147:               <div
148:                 className="absolute inset-0 rounded-3xl border-2 border-transparent
149:                               transition-all duration-300 group-hover:border-brand-orange/60
150:                               pointer-events-none"
151:               />
152:             </Link>
153:           ))}
154:         </div>
155:       </div>
156:     </section>
157:   );
158: }
````

## File: app/components/FeaturedTripsSection.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * FeaturedTripsSection — Horizontally scrollable trip cards
  5:  * 'use client' required for useRef scroll behavior
  6:  */
  7: import { useRef } from 'react';
  8: import Link from 'next/link';
  9: 
 10: import { getTravelDestinations } from '@/common/helper';
 11: 
 12: // ── Trip Card ────────────────────────────────────────────────
 13: function TripCard({ trip }) {
 14:   const difficultyColor = {
 15:     Easy: 'bg-green-100 text-green-700',
 16:     Moderate: 'bg-yellow-100 text-yellow-700',
 17:     Hard: 'bg-red-100 text-red-700',
 18:   };
 19: 
 20:   const detailsUrl = `/travel/${trip.slug}`;
 21: 
 22:   return (
 23:     <div
 24:       className="group flex-shrink-0 w-80 md:w-96 bg-white rounded-3xl overflow-hidden
 25:                  shadow-card hover:shadow-card-hover
 26:                  transition-all duration-400 hover:scale-[1.03]"
 27:     >
 28:       {/* Image — click goes to details page */}
 29:       <Link href={detailsUrl} className="block relative h-56 overflow-hidden">
 30:         <img
 31:           src={trip.image}
 32:           alt={`${trip.title} trip`}
 33:           className="w-full h-full object-cover transition-transform duration-700
 34:                      group-hover:scale-110"
 35:           loading="lazy"
 36:         />
 37:         {/* Badge */}
 38:         <span className={`absolute top-4 left-4 ${trip.badgeColor} text-white
 39:                           text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
 40:           {trip.badge}
 41:         </span>
 42:         {/* Category pill */}
 43:         <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
 44:                          text-brand-black text-xs font-bold px-3 py-1 rounded-full capitalize">
 45:           {Array.isArray(trip.category) ? trip.category[0] : trip.category}
 46:         </span>
 47:         {/* Gradient */}
 48:         <div className="absolute bottom-0 left-0 right-0 h-20
 49:                         bg-gradient-to-t from-black/50 to-transparent" />
 50:       </Link>
 51: 
 52:       {/* Content */}
 53:       <div className="p-6">
 54:         {/* Location + Duration */}
 55:         <div className="flex items-center justify-between mb-2">
 56:           <div className="flex items-center gap-1 text-brand-gray text-xs font-medium">
 57:             <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
 58:               <path fillRule="evenodd"
 59:                     d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
 60:                     clipRule="evenodd" />
 61:             </svg>
 62:             {trip.location}
 63:           </div>
 64:           <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${difficultyColor[trip.difficulty]}`}>
 65:             {trip.difficulty}
 66:           </span>
 67:         </div>
 68: 
 69:         {/* Title — link to details */}
 70:         <Link href={detailsUrl}>
 71:           <h3 className="text-xl font-extrabold text-brand-black mb-1
 72:                          group-hover:text-brand-blue transition-colors duration-300
 73:                          hover:text-brand-orange">
 74:             {trip.title}
 75:           </h3>
 76:         </Link>
 77: 
 78:         {/* Duration */}
 79:         <p className="text-brand-orange font-bold text-sm mb-3 flex items-center gap-1">
 80:           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 81:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 82:                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 83:           </svg>
 84:           {trip.duration}
 85:         </p>
 86: 
 87:         {/* Description */}
 88:         <p className="text-brand-gray text-sm font-medium leading-relaxed mb-4 line-clamp-2">
 89:           {trip.description}
 90:         </p>
 91: 
 92:         {/* Highlights */}
 93:         <div className="flex flex-wrap gap-1.5 mb-5">
 94:           {trip.highlights.slice(0, 3).map((h) => (
 95:             <span key={h}
 96:                   className="bg-blue-50 text-brand-blue text-xs font-semibold
 97:                              px-2.5 py-1 rounded-lg">
 98:               {h}
 99:             </span>
100:           ))}
101:         </div>
102: 
103:         {/* Price + CTA */}
104:         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
105:           <div>
106:             <p className="text-2xl font-black text-brand-orange">{trip.price}</p>
107:             <p className="text-xs text-brand-gray line-through font-medium">{trip.originalPrice}</p>
108:             <p className="text-xs text-green-600 font-semibold">per person</p>
109:           </div>
110:           <Link
111:             href={detailsUrl}
112:             id={`book-${trip.id}-btn`}
113:             className="btn-orange text-sm px-5 py-2.5"
114:           >
115:             Book Now
116:           </Link>
117:         </div>
118:       </div>
119:     </div>
120:   );
121: }
122: 
123: // ── Section ─────────────────────────────────────────────────
124: export default function FeaturedTripsSection() {
125:   const scrollRef = useRef(null);
126:   const TRIPS = getTravelDestinations();
127: 
128:   const scroll = (dir) => {
129:     const el = scrollRef.current;
130:     if (el) el.scrollBy({ left: dir * 400, behavior: 'smooth' });
131:   };
132: 
133:   return (
134:     <section
135:       id="featured-trips"
136:       className="py-14 sm:py-20 md:py-28 bg-brand-light"
137:       aria-labelledby="trips-heading"
138:     >
139:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
140: 
141:         {/* ── Header row ── */}
142:         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
143:           <div>
144:             <span className="inline-block bg-orange-100 text-brand-orange text-xs sm:text-sm font-bold
145:                              px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 tracking-wide uppercase">
146:               Hand-Picked
147:             </span>
148:             <h2 id="trips-heading" className="section-heading">
149:               Featured Adventures
150:             </h2>
151:             <p className="text-brand-gray font-medium text-lg mt-2">
152:               Expertly curated trips for every kind of traveler.
153:             </p>
154:           </div>
155: 
156:           {/* Scroll arrows */}
157:           <div className="hidden sm:flex items-center gap-3">
158:             <button
159:               id="trips-scroll-left"
160:               onClick={() => scroll(-1)}
161:               className="w-12 h-12 rounded-full border-2 border-brand-gray/30
162:                          flex items-center justify-center text-brand-gray
163:                          hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50
164:                          transition-all duration-200"
165:               aria-label="Scroll left"
166:             >
167:               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
168:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
169:               </svg>
170:             </button>
171:             <button
172:               id="trips-scroll-right"
173:               onClick={() => scroll(1)}
174:               className="w-12 h-12 rounded-full bg-brand-orange text-white
175:                          flex items-center justify-center
176:                          hover:bg-brand-orange-hover hover:scale-110
177:                          transition-all duration-200 shadow-orange-glow"
178:               aria-label="Scroll right"
179:             >
180:               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
181:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
182:               </svg>
183:             </button>
184:           </div>
185:         </div>
186: 
187:         {/* ── Horizontal Scroll Container ── */}
188:         <div
189:           ref={scrollRef}
190:           className="flex gap-6 overflow-x-auto pb-6 trips-scroll snap-x snap-mandatory"
191:           style={{ scrollSnapType: 'x mandatory' }}
192:         >
193:           {TRIPS.map((trip) => (
194:             <div key={trip.id} className="snap-start">
195:               <TripCard trip={trip} />
196:             </div>
197:           ))}
198: 
199:           {/* "View All" card */}
200:           <div className="flex-shrink-0 w-64 flex items-center justify-center snap-start">
201:             <Link
202:               href="/travel"
203:               id="view-all-trips-btn"
204:               className="flex flex-col items-center gap-4 p-8 rounded-3xl
205:                          border-2 border-dashed border-brand-orange/40
206:                          hover:border-brand-orange hover:bg-orange-50
207:                          transition-all duration-300 group w-full h-full min-h-[400px]"
208:             >
209:               <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center
210:                               group-hover:bg-brand-orange transition-colors duration-300">
211:                 <svg className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors"
212:                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
213:                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
214:                         d="M4 6h16M4 10h16M4 14h16M4 18h16" />
215:                 </svg>
216:               </div>
217:               <div className="text-center">
218:                 <p className="font-extrabold text-brand-black text-lg group-hover:text-brand-orange
219:                               transition-colors duration-300">
220:                   View All Trips
221:                 </p>
222:                 <p className="text-brand-gray text-sm font-medium mt-1">200+ adventures await</p>
223:               </div>
224:             </Link>
225:           </div>
226:         </div>
227:       </div>
228:     </section>
229:   );
230: }
````

## File: app/components/Footer.js
````javascript
  1: /**
  2:  * Footer — Server Component
  3:  * Simple footer with logo, quick links, social icons, and copyright
  4:  */
  5: 
  6: const FOOTER_LINKS = {
  7:   Explore: ['Trips', 'Trek', 'Ride', 'Community'],
  8:   Company: ['About Us', 'Ambassador', 'Blog', 'Careers'],
  9:   Support: ['FAQ', 'Contact', 'Cancellation Policy', 'Privacy Policy'],
 10: };
 11: 
 12: const SOCIAL = [
 13:   {
 14:     name: 'Instagram',
 15:     href: '#',
 16:     icon: (
 17:       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
 18:         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
 19:       </svg>
 20:     ),
 21:   },
 22:   {
 23:     name: 'YouTube',
 24:     href: '#',
 25:     icon: (
 26:       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
 27:         <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
 28:       </svg>
 29:     ),
 30:   },
 31:   {
 32:     name: 'Twitter',
 33:     href: '#',
 34:     icon: (
 35:       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
 36:         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
 37:       </svg>
 38:     ),
 39:   },
 40: ];
 41: 
 42: export default function Footer() {
 43:   const currentYear = new Date().getFullYear();
 44: 
 45:   return (
 46:     <footer
 47:       className="bg-brand-black text-white"
 48:       aria-label="Site footer"
 49:     >
 50:       {/* ── Main Footer Grid ── */}
 51:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
 52:         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
 53: 
 54:           {/* Brand Column */}
 55:           <div className="lg:col-span-2">
 56:             {/* Logo */}
 57:             <div className="flex items-center gap-2 mb-5">
 58:               <svg className="w-8 h-8 text-brand-orange" viewBox="0 0 32 32" fill="currentColor">
 59:                 <path d="M2 28 L10 10 L16 18 L20 12 L30 28 Z" />
 60:                 <circle cx="22" cy="9" r="2.5" />
 61:               </svg>
 62:               <span className="text-lg font-extrabold tracking-tight">
 63:                 Travel{' '}
 64:                 <span className="text-brand-orange">•</span>{' '}
 65:                 Trek{' '}
 66:                 <span className="text-brand-orange">•</span>{' '}
 67:                 Ride
 68:               </span>
 69:             </div>
 70: 
 71:             <p className="text-white/60 font-medium text-sm leading-relaxed max-w-xs mb-6">
 72:               India&apos;s most adventurous travel community. Explore mountains, rivers, and
 73:               open roads with fellow travelers who share your passion.
 74:             </p>
 75: 
 76:             {/* Social Icons */}
 77:             <div className="flex items-center gap-3">
 78:               {SOCIAL.map((s) => (
 79:                 <a
 80:                   key={s.name}
 81:                   href={s.href}
 82:                   aria-label={s.name}
 83:                   className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center
 84:                              text-white/60 hover:bg-brand-orange hover:text-white
 85:                              transition-all duration-200 hover:scale-110"
 86:                 >
 87:                   {s.icon}
 88:                 </a>
 89:               ))}
 90:             </div>
 91:           </div>
 92: 
 93:           {/* Link Columns */}
 94:           {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
 95:             <div key={heading}>
 96:               <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-5">
 97:                 {heading}
 98:               </h3>
 99:               <ul className="space-y-3" role="list">
100:                 {links.map((link) => (
101:                   <li key={link}>
102:                     <a
103:                       href="#"
104:                       className="text-white/50 hover:text-brand-orange text-sm font-medium
105:                                  transition-colors duration-200"
106:                     >
107:                       {link}
108:                     </a>
109:                   </li>
110:                 ))}
111:               </ul>
112:             </div>
113:           ))}
114:         </div>
115:       </div>
116: 
117:       {/* ── Bottom Bar ── */}
118:       <div className="border-t border-white/10">
119:         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
120:                         flex flex-col sm:flex-row justify-between items-center gap-4">
121:           <p className="text-white/40 text-sm font-medium">
122:             © {currentYear} Travel • Trek • Ride. All rights reserved.
123:           </p>
124:           <div className="flex items-center gap-6">
125:             {['Terms', 'Privacy', 'Cookies'].map((item) => (
126:               <a key={item} href="#"
127:                  className="text-white/40 hover:text-white/70 text-sm font-medium
128:                             transition-colors duration-200">
129:                 {item}
130:               </a>
131:             ))}
132:           </div>
133:         </div>
134:       </div>
135:     </footer>
136:   );
137: }
````

## File: app/components/HeroSection.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * HeroSection — Full-viewport hero with background image, overlay, and CTAs
  5:  * 'use client' for smooth-scroll CTA button behavior
  6:  */
  7: 
  8: export default function HeroSection() {
  9:   const handleScroll = (href) => {
 10:     const el = document.querySelector(href);
 11:     if (el) el.scrollIntoView({ behavior: 'smooth' });
 12:   };
 13: 
 14:   return (
 15:     <section
 16:       id="hero"
 17:       className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
 18:       aria-label="Hero section"
 19:     >
 20:       {/* ── Background Image ── */}
 21:       <div className="absolute inset-0 z-0">
 22:         <img
 23:           src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80&auto=format&fit=crop"
 24:           alt="Scenic mountain landscape for adventure travel"
 25:           className="w-full h-full object-cover object-center"
 26:           loading="eager"
 27:           fetchPriority="high"
 28:         />
 29:         {/* Dark gradient overlay */}
 30:         <div className="hero-overlay absolute inset-0" />
 31:       </div>
 32: 
 33:       {/* ── Floating Decorative Particles ── */}
 34:       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
 35:         {[...Array(8)].map((_, i) => (
 36:           <div
 37:             key={i}
 38:             className="absolute rounded-full bg-brand-orange opacity-20 animate-pulse-slow"
 39:             style={{
 40:               width: `${Math.random() * 80 + 20}px`,
 41:               height: `${Math.random() * 80 + 20}px`,
 42:               top: `${Math.random() * 80 + 5}%`,
 43:               left: `${Math.random() * 90 + 2}%`,
 44:               animationDelay: `${Math.random() * 3}s`,
 45:               animationDuration: `${Math.random() * 3 + 3}s`,
 46:             }}
 47:           />
 48:         ))}
 49:       </div>
 50: 
 51:       {/* ── Hero Content ── */}
 52:       <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto w-full">
 53:         {/* Badge */}
 54:         <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
 55:                         border border-white/20 text-white text-xs sm:text-sm font-semibold
 56:                         px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 animate-fade-up">
 57:           <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse-slow" />
 58:           Premium Adventure Travel Platform
 59:         </div>
 60: 
 61:         {/* Main Tagline */}
 62:         <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white
 63:                        leading-none tracking-tight mb-4 animate-fade-up"
 64:             style={{ animationDelay: '0.1s' }}>
 65:           Travel{' '}
 66:           <span className="text-gradient-orange">•</span>{' '}
 67:           Trek{' '}
 68:           <span className="text-gradient-orange">•</span>{' '}
 69:           Ride
 70:         </h1>
 71: 
 72:         {/* Sub tagline */}
 73:         <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/90
 74:                       mb-3 tracking-widest uppercase animate-fade-up"
 75:            style={{ animationDelay: '0.2s' }}>
 76:           Explore. Earn. Experience.
 77:         </p>
 78: 
 79:         {/* Description */}
 80:         <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-8 sm:mb-10
 81:                       font-medium leading-relaxed animate-fade-up px-2 sm:px-0"
 82:            style={{ animationDelay: '0.3s' }}>
 83:           Curated adventures across India &amp; beyond — mountains, rivers, deserts.
 84:           Book your next epic journey with EMI options and earn as an Ambassador.
 85:         </p>
 86: 
 87:         {/* CTA Buttons */}
 88:         <div className="flex flex-col xs:flex-row gap-3 justify-center items-center
 89:                         animate-fade-up px-4 xs:px-0"
 90:              style={{ animationDelay: '0.4s' }}>
 91:           <button
 92:             id="hero-explore-btn"
 93:             onClick={() => handleScroll('#featured-trips')}
 94:             className="btn-blue text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full xs:w-auto"
 95:           >
 96:             <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 97:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 98:                     d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
 99:             </svg>
100:             Explore Trips
101:           </button>
102:           <button
103:             id="hero-join-btn"
104:             onClick={() => handleScroll('#ambassador')}
105:             className="btn-orange text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full xs:w-auto"
106:           >
107:             <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
108:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
109:                     d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
110:             </svg>
111:             Join Now
112:           </button>
113:         </div>
114: 
115:         {/* Stats Row */}
116:         <div className="flex flex-wrap justify-center gap-5 sm:gap-8 mt-10 sm:mt-14 animate-fade-up"
117:              style={{ animationDelay: '0.5s' }}>
118:           {[
119:             { num: '10,000+', label: 'Happy Travelers' },
120:             { num: '200+', label: 'Curated Trips' },
121:             { num: '50+', label: 'Destinations' },
122:           ].map((stat) => (
123:             <div key={stat.label} className="text-center">
124:               <p className="text-2xl sm:text-3xl font-black text-brand-orange">{stat.num}</p>
125:               <p className="text-white/70 text-xs sm:text-sm font-medium mt-1">{stat.label}</p>
126:             </div>
127:           ))}
128:         </div>
129:       </div>
130: 
131:       {/* ── Scroll Indicator ── */}
132:       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
133:         <button
134:           onClick={() => handleScroll('#categories')}
135:           className="flex flex-col items-center gap-2 text-white/70 hover:text-white
136:                      transition-colors duration-200"
137:           aria-label="Scroll down"
138:         >
139:           <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
140:           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
141:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
142:           </svg>
143:         </button>
144:       </div>
145:     </section>
146:   );
147: }
````

## File: app/components/Navbar.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * Navbar — sticky, transparent-on-top, solid on scroll
  5:  * Uses 'use client' for scroll detection & mobile menu toggle
  6:  */
  7: import { useState, useEffect } from 'react';
  8: 
  9: const NAV_LINKS = [
 10:   { label: 'Trips', href: '#trips' },
 11:   { label: 'Trek', href: '#trek' },
 12:   { label: 'Ride', href: '#ride' },
 13:   { label: 'Community', href: '#community' },
 14:   { label: 'Ambassador', href: '#ambassador' },
 15: ];
 16: 
 17: export default function Navbar() {
 18:   const [scrolled, setScrolled] = useState(false);
 19:   const [mobileOpen, setMobileOpen] = useState(false);
 20: 
 21:   /* ── Scroll listener ───────────────────────── */
 22:   useEffect(() => {
 23:     const handleScroll = () => setScrolled(window.scrollY > 40);
 24:     window.addEventListener('scroll', handleScroll, { passive: true });
 25:     return () => window.removeEventListener('scroll', handleScroll);
 26:   }, []);
 27: 
 28:   /* ── Smooth scroll helper ──────────────────── */
 29:   const handleNavClick = (e, href) => {
 30:     e.preventDefault();
 31:     setMobileOpen(false);
 32:     const el = document.querySelector(href);
 33:     if (el) el.scrollIntoView({ behavior: 'smooth' });
 34:   };
 35: 
 36:   return (
 37:     <header
 38:       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
 39:         scrolled
 40:           ? 'bg-white shadow-md backdrop-blur-sm'
 41:           : 'bg-transparent'
 42:       }`}
 43:     >
 44:       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 45:         <div className="flex items-center justify-between h-16 md:h-20">
 46: 
 47:           {/* ── Logo ── */}
 48:           <a
 49:             href="#hero"
 50:             onClick={(e) => handleNavClick(e, '#hero')}
 51:             className="flex items-center gap-2 group"
 52:             aria-label="Travel Trek Ride Home"
 53:           >
 54:             {/* Mountain SVG Icon */}
 55:             <svg
 56:               className="w-8 h-8 text-brand-orange transition-transform duration-300 group-hover:scale-110"
 57:               viewBox="0 0 32 32"
 58:               fill="currentColor"
 59:               aria-hidden="true"
 60:             >
 61:               <path d="M2 28 L10 10 L16 18 L20 12 L30 28 Z" />
 62:               <circle cx="22" cy="9" r="2.5" />
 63:             </svg>
 64:             <span
 65:               className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
 66:                 scrolled ? 'text-brand-black' : 'text-white'
 67:               }`}
 68:             >
 69:               Travel{' '}
 70:               <span className="text-brand-orange">•</span>{' '}
 71:               Trek{' '}
 72:               <span className="text-brand-orange">•</span>{' '}
 73:               Ride
 74:             </span>
 75:           </a>
 76: 
 77:           {/* ── Desktop Nav Links ── */}
 78:           <ul className="hidden md:flex items-center gap-8" role="list">
 79:             {NAV_LINKS.map((link) => (
 80:               <li key={link.label}>
 81:                 <a
 82:                   href={link.href}
 83:                   onClick={(e) => handleNavClick(e, link.href)}
 84:                   className={`font-semibold text-sm relative py-1 transition-colors duration-200
 85:                     after:absolute after:bottom-0 after:left-0 after:right-0
 86:                     after:h-0.5 after:bg-brand-orange after:scale-x-0
 87:                     after:transition-transform after:duration-300
 88:                     hover:text-brand-orange hover:after:scale-x-100
 89:                     ${scrolled ? 'text-brand-black' : 'text-white'}`}
 90:                 >
 91:                   {link.label}
 92:                 </a>
 93:               </li>
 94:             ))}
 95:           </ul>
 96: 
 97:           {/* ── Desktop CTA Buttons ── */}
 98:           <div className="hidden md:flex items-center gap-3">
 99:             <button
100:               id="navbar-login-btn"
101:               className={`font-bold text-sm px-5 py-2 rounded-full border-2 transition-all duration-300
102:                 hover:scale-105 active:scale-95
103:                 ${scrolled
104:                   ? 'border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
105:                   : 'border-white text-white hover:bg-white hover:text-brand-black'
106:                 }`}
107:             >
108:               Login
109:             </button>
110:             <button
111:               id="navbar-join-btn"
112:               className="btn-orange text-sm px-5 py-2"
113:             >
114:               Join Now
115:             </button>
116:           </div>
117: 
118:           {/* ── Mobile Hamburger ── */}
119:           <button
120:             id="mobile-menu-btn"
121:             className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
122:               scrolled ? 'text-brand-black' : 'text-white'
123:             }`}
124:             onClick={() => setMobileOpen((prev) => !prev)}
125:             aria-label="Toggle mobile menu"
126:             aria-expanded={mobileOpen}
127:           >
128:             <svg
129:               className="w-6 h-6"
130:               fill="none"
131:               stroke="currentColor"
132:               viewBox="0 0 24 24"
133:             >
134:               {mobileOpen ? (
135:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
136:               ) : (
137:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
138:               )}
139:             </svg>
140:           </button>
141:         </div>
142: 
143:         {/* ── Mobile Menu Dropdown ── */}
144:         <div
145:           className={`md:hidden overflow-hidden transition-all duration-300 ${
146:             mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
147:           }`}
148:         >
149:           <div className="bg-white rounded-2xl shadow-xl mx-2 mb-4 p-4">
150:             <ul className="flex flex-col gap-1" role="list">
151:               {NAV_LINKS.map((link) => (
152:                 <li key={link.label}>
153:                   <a
154:                     href={link.href}
155:                     onClick={(e) => handleNavClick(e, link.href)}
156:                     className="block px-4 py-3 rounded-xl text-brand-black font-semibold
157:                                hover:bg-orange-50 hover:text-brand-orange transition-colors duration-200"
158:                   >
159:                     {link.label}
160:                   </a>
161:                 </li>
162:               ))}
163:             </ul>
164:             <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
165:               <button
166:                 id="mobile-login-btn"
167:                 className="btn-outline !border-brand-blue !text-brand-blue hover:!bg-brand-blue hover:!text-white w-full"
168:               >
169:                 Login
170:               </button>
171:               <button id="mobile-join-btn" className="btn-orange w-full">
172:                 Join Now
173:               </button>
174:             </div>
175:           </div>
176:         </div>
177:       </nav>
178:     </header>
179:   );
180: }
````

## File: app/components/WhyUsSection.js
````javascript
  1: /**
  2:  * WhyUsSection — Server Component
  3:  * "Why Travelers Love Us" feature cards grid
  4:  */
  5: 
  6: const FEATURES = [
  7:   {
  8:     id: 'budget-friendly',
  9:     icon: '💸',
 10:     title: 'Budget Friendly',
 11:     description:
 12:       'We negotiate the best deals so you don\'t have to. Quality experiences at prices that won\'t break the bank. Transparent pricing, zero hidden charges.',
 13:     highlight: 'Starting ₹3,999',
 14:   },
 15:   {
 16:     id: 'emi-available',
 17:     icon: '📆',
 18:     title: 'EMI Available',
 19:     description:
 20:       'Travel now, pay later. Flexible EMI options with 0% interest starting from ₹0 down payment. Book your dream trip without any financial stress.',
 21:     highlight: '0% Interest',
 22:   },
 23:   {
 24:     id: 'community-trips',
 25:     icon: '🤝',
 26:     title: 'Community Trips',
 27:     description:
 28:       'Travel is better together. Join a thriving community of 10,000+ adventurers. Meet like-minded explorers, share stories, and build lifelong friendships.',
 29:     highlight: '10,000+ Members',
 30:   },
 31: ];
 32: 
 33: // ── Feature Card (Server Component) ────────────────────────
 34: function FeatureCard({ feature }) {
 35:   return (
 36:     <div
 37:       className="group bg-white rounded-3xl p-8 shadow-card
 38:                  hover:shadow-card-hover hover:scale-[1.03]
 39:                  transition-all duration-300 cursor-default
 40:                  border border-transparent hover:border-orange-100"
 41:     >
 42:       {/* Icon Ring */}
 43:       <div className="flex items-center justify-center w-20 h-20 rounded-2xl
 44:                       bg-orange-50 group-hover:bg-brand-orange
 45:                       transition-all duration-300 mb-6 text-4xl
 46:                       shadow-sm group-hover:shadow-orange-glow">
 47:         <span role="img" aria-label={feature.title}>{feature.icon}</span>
 48:       </div>
 49: 
 50:       {/* Highlight Badge */}
 51:       <span className="inline-block bg-blue-50 text-brand-blue text-xs font-bold
 52:                        px-3 py-1 rounded-full mb-3 tracking-wide">
 53:         {feature.highlight}
 54:       </span>
 55: 
 56:       {/* Title */}
 57:       <h3 className="text-xl font-extrabold text-brand-black mb-3 group-hover:text-brand-orange
 58:                      transition-colors duration-300">
 59:         {feature.title}
 60:       </h3>
 61: 
 62:       {/* Description */}
 63:       <p className="text-brand-gray font-medium text-sm leading-relaxed">
 64:         {feature.description}
 65:       </p>
 66: 
 67:       {/* Bottom accent line */}
 68:       <div className="mt-6 h-1 w-0 bg-brand-orange rounded-full
 69:                       transition-all duration-500 group-hover:w-full" />
 70:     </div>
 71:   );
 72: }
 73: 
 74: // ── Section ─────────────────────────────────────────────────
 75: export default function WhyUsSection() {
 76:   return (
 77:     <section
 78:       id="why-us"
 79:       className="py-20 md:py-28 bg-gradient-to-br from-blue-950 via-brand-black to-gray-900
 80:                  relative overflow-hidden"
 81:       aria-labelledby="why-us-heading"
 82:     >
 83:       {/* Decorative background blobs */}
 84:       <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full
 85:                       blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
 86:       <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full
 87:                       blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
 88: 
 89:       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 90: 
 91:         {/* ── Section Header ── */}
 92:         <div className="text-center mb-10 sm:mb-14">
 93:           <span className="inline-block bg-orange-500/20 text-brand-orange text-xs sm:text-sm font-bold
 94:                            px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 tracking-wide uppercase border border-orange-500/30">
 95:             Our Promise
 96:           </span>
 97:           <h2
 98:             id="why-us-heading"
 99:             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white
100:                        leading-tight mb-3 sm:mb-4"
101:           >
102:             Why Travelers{' '}
103:             <span className="text-gradient-orange">Love Us</span>
104:           </h2>
105:           <p className="text-white/60 font-medium text-sm sm:text-lg max-w-xl mx-auto">
106:             Built by travelers, for travelers. Everything we do revolves around your adventure.
107:           </p>
108:         </div>
109: 
110:         {/* ── Cards Grid ── */}
111:         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
112:           {FEATURES.map((feature) => (
113:             <FeatureCard key={feature.id} feature={feature} />
114:           ))}
115:         </div>
116: 
117:         {/* ── Trust bar ── */}
118:         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
119:           {[
120:             { val: '4.9★', label: 'Average Rating' },
121:             { val: '200+', label: 'Trips Done' },
122:             { val: '₹0 Hidden', label: 'Zero Hidden Fees' },
123:             { val: '24/7', label: 'Support Available' },
124:           ].map((item) => (
125:             <div key={item.label}
126:                  className="bg-white/5 backdrop-blur-sm border border-white/10
127:                             rounded-2xl py-5 px-4">
128:               <p className="text-2xl font-black text-brand-orange">{item.val}</p>
129:               <p className="text-white/60 text-sm font-medium mt-1">{item.label}</p>
130:             </div>
131:           ))}
132:         </div>
133:       </div>
134:     </section>
135:   );
136: }
````

## File: app/ride/[slug]/booking/page.js
````javascript
 1: /**
 2:  * app/ride/[slug]/booking/page.js
 3:  * Booking Page — Server Component (SSR)
 4:  * Route: /ride/[slug]/booking
 5:  */
 6: 
 7: import Link from 'next/link';
 8: import { notFound } from 'next/navigation';
 9: import Navbar from '@/app/components/Navbar';
10: import Footer from '@/app/components/Footer';
11: import { getRideBySlug } from '@/common/helper';
12: import BookingForm from '@/common/components/BookingForm';
13: 
14: export async function generateMetadata({ params }) {
15:   const dest = getRideBySlug(params.slug);
16:   if (!dest) return { title: 'Ride Not Found — Travel • Trek • Ride' };
17:   return {
18:     title: `Book ${dest.title} — Travel • Trek • Ride`,
19:     description: `Book ${dest.title} for ${dest.price}/rider. Fill your details and pay via UPI instantly.`,
20:   };
21: }
22: 
23: export default async function RideBookingPage({ params }) {
24:   const dest = getRideBySlug(params.slug);
25:   if (!dest) notFound();
26: 
27:   return (
28:     <>
29:       <Navbar />
30:       <main className="min-h-screen bg-brand-light">
31: 
32:         {/* ── Page Header ──────────────────────────────────── */}
33:         <section className="relative overflow-hidden py-14
34:                             bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue">
35:           <div className="absolute inset-0 opacity-5 pointer-events-none"
36:                style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
37:           <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
38:             {/* Breadcrumb */}
39:             <nav className="flex items-center gap-2 text-white/50 text-sm font-medium mb-5">
40:               <Link href="/" className="hover:text-white transition-colors">Home</Link>
41:               <span>/</span>
42:               <Link href="/ride" className="hover:text-white transition-colors">Ride</Link>
43:               <span>/</span>
44:               <Link href={`/ride/${dest.slug}`}
45:                     className="hover:text-white transition-colors truncate">
46:                 {dest.title}
47:               </Link>
48:               <span>/</span>
49:               <span className="text-brand-orange font-bold">Book Now</span>
50:             </nav>
51: 
52:             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
53:               <div>
54:                 <span className="inline-block bg-orange-500/20 text-brand-orange text-xs font-bold
55:                                  px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
56:                   Secure Moto Booking
57:                 </span>
58:                 <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
59:                   {dest.title}
60:                 </h1>
61:                 <p className="text-white/60 font-medium mt-1">
62:                   {dest.duration} · {dest.distance} · {dest.location}
63:                 </p>
64:               </div>
65:               <div className="text-right">
66:                 <p className="text-4xl font-black text-brand-orange">{dest.price}</p>
67:                 <p className="text-white/50 text-sm font-medium">per rider</p>
68:               </div>
69:             </div>
70:           </div>
71:         </section>
72: 
73:         {/* ── Form + Summary ───────────────────────────────── */}
74:         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
75:           {/* Reuse the BookingForm identically! */}
76:           <BookingForm destination={dest} />
77:         </div>
78: 
79:       </main>
80:       <Footer />
81:     </>
82:   );
83: }
````

## File: app/ride/[slug]/page.js
````javascript
  1: /**
  2:  * app/ride/[slug]/page.js
  3:  * Ride Details Page — Server Component (SSR)
  4:  */
  5: import Link from "next/link";
  6: import { notFound } from "next/navigation";
  7: import Navbar from "@/app/components/Navbar";
  8: import Footer from "@/app/components/Footer";
  9: import { getAllRides, getRideBySlug } from "@/common/helper";
 10: import {
 11:   DistanceIcon,
 12:   DurationIcon,
 13:   BikeIcon,
 14:   DifficultyIcon,
 15:   SafetyIcon,
 16: } from "@/common/icons";
 17: 
 18: // Re-using FAQSection exactly like in Treks!
 19: import FAQSection from "@/common/components/FAQSection";
 20: 
 21: // ── Static Params
 22: export async function generateStaticParams() {
 23:   return getAllRides().map((r) => ({ slug: r.slug }));
 24: }
 25: 
 26: // ── Dynamic Metadata
 27: export async function generateMetadata({ params }) {
 28:   const ride = getRideBySlug(params.slug);
 29:   if (!ride) return { title: "Ride Not Found" };
 30:   return {
 31:     title: `${ride.title} — ${ride.price} | Travel • Trek • Ride`,
 32:     description: ride.description.slice(0, 155),
 33:   };
 34: }
 35: 
 36: const diffStyle = {
 37:   Easy: "bg-green-100 text-green-700",
 38:   Moderate: "bg-yellow-100 text-yellow-700",
 39:   Hard: "bg-red-100 text-red-700",
 40: };
 41: 
 42: export default async function RideDetailsPage({ params }) {
 43:   const ride = getRideBySlug(params.slug);
 44:   if (!ride) notFound();
 45: 
 46:   const {
 47:     title,
 48:     route,
 49:     image,
 50:     price,
 51:     originalPrice,
 52:     days,
 53:     nights,
 54:     duration,
 55:     distance,
 56:     bike,
 57:     rating,
 58:     reviews,
 59:     difficulty,
 60:     category,
 61:     badge,
 62:     badgeColor,
 63:     description,
 64:     highlights,
 65:     itinerary,
 66:     inclusions,
 67:     exclusions,
 68:     galleryImages,
 69:     faqs,
 70:     safetyNote,
 71:   } = ride;
 72: 
 73:   return (
 74:     <>
 75:       <Navbar />
 76:       <main className="min-h-screen bg-brand-light font-sans">
 77:         {/* 1. HERO SECTION */}
 78:         <section className="relative h-[65vh] min-h-[450px] flex items-end pb-12 overflow-hidden">
 79:           <img
 80:             src={image}
 81:             alt={title}
 82:             className="absolute inset-0 w-full h-full object-cover"
 83:             loading="eager"
 84:           />
 85:           <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/50 to-transparent" />
 86: 
 87:           <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 88:             <nav className="flex items-center gap-2 text-white/70 text-sm font-medium mb-5">
 89:               <Link href="/" className="hover:text-white transition-colors">
 90:                 Home
 91:               </Link>
 92:               <span>/</span>
 93:               <Link href="/ride" className="hover:text-white transition-colors">
 94:                 Rides
 95:               </Link>
 96:               <span>/</span>
 97:               <span className="text-brand-orange font-bold truncate">
 98:                 {title}
 99:               </span>
100:             </nav>
101: 
102:             <div className="flex flex-wrap items-center gap-3 mb-4">
103:               <span
104:                 className={`${
105:                   badgeColor || "bg-brand-orange"
106:                 } text-white text-xs font-black tracking-wide px-3 py-1.5 rounded-full uppercase`}
107:               >
108:                 {badge}
109:               </span>
110:               <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
111:                 {category}
112:               </span>
113:             </div>
114: 
115:             <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-md">
116:               {title}
117:             </h1>
118: 
119:             {/* Quick Hero Metrics */}
120:             <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-white font-medium">
121:               <span className="flex items-center gap-2">
122:                 <DistanceIcon /> <span className="text-lg">{distance}</span>
123:               </span>
124:               <span className="flex items-center gap-2">
125:                 <BikeIcon />{" "}
126:                 <span className="text-lg">
127:                   {bike.split(" ")[0]} {bike.split(" ")[1]}
128:                 </span>
129:               </span>
130:               <span className="flex items-center gap-2 text-amber-400">
131:                 ★ {rating}{" "}
132:                 <span className="text-white/60 text-sm ml-1">({reviews})</span>
133:               </span>
134:             </div>
135:           </div>
136:         </section>
137: 
138:         {/* 2. MAIN CONTENT (2-column layout) */}
139:         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
140:           <div className="flex flex-col lg:flex-row gap-10">
141:             {/* ────── LEFT COLUMN (70%) ────── */}
142:             <div className="flex-1 min-w-0 space-y-12">
143:               {/* About Ride */}
144:               <section id="about">
145:                 <h2 className="text-3xl font-black text-brand-black mb-5 flex items-center gap-3">
146:                   <span className="w-1.5 h-8 bg-brand-orange rounded-full block" />
147:                   About This Ride
148:                 </h2>
149:                 <p className="text-brand-gray font-medium leading-relaxed text-lg">
150:                   {description}
151:                 </p>
152:                 {/* Specs Box */}
153:                 <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
154:                   <div>
155:                     <p className="text-xs text-brand-gray font-bold uppercase tracking-wider mb-1">
156:                       Route
157:                     </p>
158:                     <p className="text-sm font-black text-brand-black leading-snug">
159:                       {route}
160:                     </p>
161:                   </div>
162:                   <div>
163:                     <p className="text-xs text-brand-gray font-bold uppercase tracking-wider mb-1">
164:                       Distance
165:                     </p>
166:                     <p className="text-sm font-black text-brand-black">
167:                       {distance}
168:                     </p>
169:                   </div>
170:                   <div>
171:                     <p className="text-xs text-brand-gray font-bold uppercase tracking-wider mb-1">
172:                       Duration
173:                     </p>
174:                     <p className="text-sm font-black text-brand-black">
175:                       {duration}
176:                     </p>
177:                   </div>
178:                   <div>
179:                     <p className="text-xs text-brand-gray font-bold uppercase tracking-wider mb-1">
180:                       Difficulty
181:                     </p>
182:                     <span
183:                       className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase ${diffStyle[difficulty]}`}
184:                     >
185:                       {difficulty}
186:                     </span>
187:                   </div>
188:                 </div>
189:               </section>
190: 
191:               {/* Bike Details */}
192:               <section
193:                 id="bike-info"
194:                 className="bg-brand-black text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
195:               >
196:                 <div className="absolute -right-10 -bottom-10 opacity-20">
197:                   <svg
198:                     className="w-64 h-64"
199:                     fill="currentColor"
200:                     viewBox="0 0 24 24"
201:                   >
202:                     <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
203:                   </svg>
204:                 </div>
205:                 <div className="relative z-10">
206:                   <h3 className="text-brand-orange text-sm font-black uppercase tracking-widest mb-2">
207:                     The Machine
208:                   </h3>
209:                   <h2 className="text-3xl font-black mb-4">{bike}</h2>
210:                   <p className="text-white/70 font-medium max-w-lg leading-relaxed">
211:                     Designed for adventure touring. The ride package includes
212:                     full rental of this machine, mechanically vetted before
213:                     kickoff. Fuel is included as per the official itinerary.
214:                   </p>
215:                 </div>
216:               </section>
217: 
218:               {/* Highlights */}
219:               <section id="highlights">
220:                 <h2 className="text-2xl font-black text-brand-black mb-6 flex items-center gap-2">
221:                   <span className="w-1.5 h-7 bg-brand-orange rounded-full block" />
222:                   Expedition Highlights
223:                 </h2>
224:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
225:                   {highlights.map((h, idx) => (
226:                     <div
227:                       key={idx}
228:                       className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-brand-orange/30 transition-all"
229:                     >
230:                       <div className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0 font-black text-sm">
231:                         {idx + 1}
232:                       </div>
233:                       <span className="text-brand-black font-bold text-sm leading-snug">
234:                         {h}
235:                       </span>
236:                     </div>
237:                   ))}
238:                 </div>
239:               </section>
240: 
241:               {/* Itinerary */}
242:               <section id="itinerary">
243:                 <h2 className="text-2xl font-black text-brand-black mb-6 flex items-center gap-2">
244:                   <span className="w-1.5 h-7 bg-brand-orange rounded-full block" />
245:                   Route & Itinerary
246:                 </h2>
247:                 <div className="space-y-4 border-l-2 border-brand-orange/20 ml-6 pl-8 relative">
248:                   {itinerary.map((day) => (
249:                     <div
250:                       key={day.day}
251:                       className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
252:                     >
253:                       {/* Timeline dot */}
254:                       <span className="absolute -left-[45px] top-6 w-6 h-6 rounded-full bg-white border-4 border-brand-orange shadow-orange-glow" />
255: 
256:                       <p className="text-xs text-brand-orange font-black uppercase tracking-wider mb-1">
257:                         Day {day.day}
258:                       </p>
259:                       <h3 className="text-brand-black font-black text-lg mb-4">
260:                         {day.title}
261:                       </h3>
262:                       <ul className="space-y-2">
263:                         {day.activities.map((act, j) => (
264:                           <li
265:                             key={j}
266:                             className="flex items-start gap-2 text-sm text-brand-gray font-medium"
267:                           >
268:                             <span className="mt-1.5 w-1.5 h-1.5 bg-brand-gray/40 rounded-full flex-shrink-0" />
269:                             {act}
270:                           </li>
271:                         ))}
272:                       </ul>
273:                     </div>
274:                   ))}
275:                 </div>
276:               </section>
277: 
278:               {/* Incl/Excl */}
279:               <section
280:                 id="incl-excl"
281:                 className="grid grid-cols-1 sm:grid-cols-2 gap-6"
282:               >
283:                 <div className="bg-green-50/50 border border-green-200 rounded-3xl p-6">
284:                   <h3 className="font-black text-green-700 mb-5 flex items-center gap-2 text-lg">
285:                     <svg
286:                       className="w-6 h-6"
287:                       fill="currentColor"
288:                       viewBox="0 0 20 20"
289:                     >
290:                       <path
291:                         fillRule="evenodd"
292:                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
293:                         clipRule="evenodd"
294:                       />
295:                     </svg>
296:                     Whats Included
297:                   </h3>
298:                   <ul className="space-y-3">
299:                     {inclusions.map((inc) => (
300:                       <li
301:                         key={inc}
302:                         className="flex items-start gap-3 text-sm text-green-800 font-semibold"
303:                       >
304:                         <span className="mt-1 text-green-500">✔</span> {inc}
305:                       </li>
306:                     ))}
307:                   </ul>
308:                 </div>
309:                 <div className="bg-red-50/50 border border-red-200 rounded-3xl p-6">
310:                   <h3 className="font-black text-red-700 mb-5 flex items-center gap-2 text-lg">
311:                     <svg
312:                       className="w-6 h-6"
313:                       fill="currentColor"
314:                       viewBox="0 0 20 20"
315:                     >
316:                       <path
317:                         fillRule="evenodd"
318:                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
319:                         clipRule="evenodd"
320:                       />
321:                     </svg>
322:                     Not Included
323:                   </h3>
324:                   <ul className="space-y-3">
325:                     {exclusions.map((ex) => (
326:                       <li
327:                         key={ex}
328:                         className="flex items-start gap-3 text-sm text-red-800 font-semibold"
329:                       >
330:                         <span className="mt-1 text-red-400">✖</span> {ex}
331:                       </li>
332:                     ))}
333:                   </ul>
334:                 </div>
335:               </section>
336: 
337:               {/* Safety */}
338:               {safetyNote && (
339:                 <div className="bg-orange-50 border border-brand-orange/30 rounded-[2rem] p-6 flex items-start gap-4">
340:                   <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
341:                     <SafetyIcon />
342:                   </div>
343:                   <div>
344:                     <h4 className="text-brand-black font-black text-lg mb-1">
345:                       Safety Protocols Enforced
346:                     </h4>
347:                     <p className="text-brand-gray font-medium text-sm leading-relaxed">
348:                       {safetyNote}
349:                     </p>
350:                   </div>
351:                 </div>
352:               )}
353:             </div>
354: 
355:             {/* ────── RIGHT COLUMN — Sticky Booking (30%) ────── */}
356:             <aside className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0 relative">
357:               <div className="sticky top-24 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-card-hover">
358:                 <h3 className="text-brand-black text-lg font-black mb-6 pb-4 border-b border-gray-100 text-center">
359:                   Book Your Ride Now
360:                 </h3>
361: 
362:                 <div className="text-center mb-8">
363:                   <div className="flex justify-center items-center gap-2 mb-2">
364:                     <span className="text-xs font-bold text-brand-gray line-through">
365:                       {originalPrice}
366:                     </span>
367:                     <span className="text-xs bg-green-100 text-green-700 font-black px-2 py-1 rounded-full uppercase tracking-wide">
368:                       Save ₹
369:                       {Number(originalPrice.replace(/[₹,]/g, "")) -
370:                         Number(price.replace(/[₹,]/g, ""))}
371:                     </span>
372:                   </div>
373:                   <p className="text-5xl font-black text-brand-orange mb-1">
374:                     {price}
375:                   </p>
376:                   <p className="text-xs font-bold text-brand-gray uppercase tracking-wider">
377:                     Per Rider (Twin Sharing)
378:                   </p>
379:                 </div>
380: 
381:                 <div className="space-y-3 mb-8 bg-brand-light p-4 rounded-2xl">
382:                   <div className="flex justify-between items-center text-sm font-semibold">
383:                     <span className="text-brand-gray">Bike</span>
384:                     <span
385:                       className="text-brand-black text-right max-w-[150px] truncate"
386:                       title={bike}
387:                     >
388:                       {bike}
389:                     </span>
390:                   </div>
391:                   <div className="flex justify-between items-center text-sm font-semibold">
392:                     <span className="text-brand-gray">Fuel</span>
393:                     <span className="text-brand-black text-right">
394:                       Included
395:                     </span>
396:                   </div>
397:                   <div className="flex justify-between items-center text-sm font-semibold">
398:                     <span className="text-brand-gray">Mechanic Support</span>
399:                     <span className="text-brand-black text-right">Yes</span>
400:                   </div>
401:                 </div>
402: 
403:                 <Link
404:                   href={`/ride/${ride.slug}/booking`}
405:                   className="w-full block text-center bg-brand-orange text-white font-black text-lg py-5 rounded-full
406:                                  shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-300
407:                                  hover:bg-[#e65c00] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,107,0,0.6)]"
408:                 >
409:                   🏍️ Proceed to Book
410:                 </Link>
411: 
412:                 <p className="text-center text-[11px] font-bold text-brand-gray uppercase tracking-widest mt-6">
413:                   Only 15 Riders Per Batch!
414:                 </p>
415:               </div>
416:             </aside>
417:           </div>
418:         </div>
419: 
420:         {/* 3. GALLERY */}
421:         <section
422:           id="gallery"
423:           className="py-16 bg-white border-y border-gray-100"
424:         >
425:           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
426:             <h2 className="text-3xl font-black text-brand-black mb-8 text-center text-center">
427:               The Journey in Pictures
428:             </h2>
429:             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
430:               {galleryImages.map((src, i) => (
431:                 <div
432:                   key={i}
433:                   className="aspect-square rounded-3xl overflow-hidden group"
434:                 >
435:                   <img
436:                     src={src}
437:                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
438:                     alt={`Ride photo ${i + 1}`}
439:                     loading="lazy"
440:                   />
441:                 </div>
442:               ))}
443:             </div>
444:           </div>
445:         </section>
446: 
447:         {/* 4. FAQ */}
448:         <FAQSection faqs={faqs} />
449:       </main>
450:       <Footer />
451:     </>
452:   );
453: }
````

## File: app/ride/page.js
````javascript
  1: /**
  2:  * app/ride/page.js
  3:  * Ride Listing Page — pure Server Component (SSR)
  4:  */
  5: import Link from 'next/link';
  6: import Navbar from '@/app/components/Navbar';
  7: import Footer from '@/app/components/Footer';
  8: import { getAllRides } from '@/common/helper';
  9: import { DistanceIcon, DurationIcon, BikeIcon } from '@/common/icons';
 10: 
 11: export const metadata = {
 12:   title: 'Epic Bike Rides & Road Trips — Travel • Trek • Ride',
 13:   description: 'Ride. Explore. Feel Alive. Book premium motorcycle tours covering Manali to Leh, Spiti Valley, Rajasthan Desert, and more.',
 14: };
 15: 
 16: // ── Difficulty badge colors
 17: const diffStyle = {
 18:   Easy:     'bg-green-100 text-green-700',
 19:   Moderate: 'bg-yellow-100 text-yellow-700',
 20:   Hard:     'bg-red-100   text-red-700',
 21: };
 22: 
 23: export default async function RidePage() {
 24:   const rides = getAllRides();
 25: 
 26:   return (
 27:     <>
 28:       <Navbar />
 29: 
 30:       <main className="min-h-screen bg-brand-light flex flex-col font-sans">
 31:         
 32:         {/* 1. HERO SECTION */}
 33:         <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center">
 34:           <div 
 35:             className="absolute inset-0 bg-cover bg-center" 
 36:             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558980664-769d59546b3d?w=1600&q=80&fit=crop')` }}
 37:           />
 38:           {/* Gradients */}
 39:           <div className="absolute inset-0 bg-black/60" />
 40:           <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
 41:           
 42:           <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
 43:             <span className="inline-block bg-orange-500/20 text-brand-orange text-sm font-bold
 44:                              px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest backdrop-blur-md border border-brand-orange/30">
 45:               Motorcycle Expeditions
 46:             </span>
 47:             <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-md">
 48:               Epic Bike Rides &<br/>Road Trips
 49:             </h1>
 50:             <p className="text-lg md:text-2xl text-white/90 mb-10 font-medium max-w-2xl drop-shadow-sm">
 51:               Ride. Explore. Feel Alive. Handcrafted routes for the ultimate motorcycling experience.
 52:             </p>
 53:             <a 
 54:               href="#rides-grid"
 55:               className="px-8 py-4 bg-brand-orange text-white font-black text-lg rounded-full 
 56:                          shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all duration-300 
 57:                          hover:-translate-y-1 hover:bg-[#e65c00]"
 58:             >
 59:               Start Engines
 60:             </a>
 61:           </div>
 62:         </section>
 63: 
 64:         {/* 2. RIDES GRID SECTION */}
 65:         <section id="rides-grid" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
 66:           <div className="text-center mb-16">
 67:             <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-4">
 68:               Our Adventure Rides
 69:             </h2>
 70:             <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
 71:             <p className="mt-6 text-brand-gray font-medium text-lg max-w-2xl mx-auto">
 72:               From traversing high-altitude Himalayan passes to cruising smoothly along the western coastline, select your legendary journey.
 73:             </p>
 74:           </div>
 75: 
 76:           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 77:             {rides.map((ride) => (
 78:               <article
 79:                 key={ride.id}
 80:                 className="group bg-white rounded-[2rem] overflow-hidden shadow-card border border-gray-100
 81:                            hover:shadow-card-hover hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
 82:               >
 83:                 {/* Image area */}
 84:                 <div className="relative h-64 overflow-hidden flex-shrink-0">
 85:                   <img
 86:                     src={ride.image}
 87:                     alt={ride.title}
 88:                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 89:                     loading="lazy"
 90:                   />
 91:                   {/* Overlay grad */}
 92:                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 93:                   
 94:                   {/* Badges */}
 95:                   <span className={`absolute top-4 left-4 ${ride.badgeColor} text-white
 96:                                     text-[11px] font-black tracking-wide px-3 py-1.5 rounded-full shadow-lg uppercase`}>
 97:                     {ride.badge}
 98:                   </span>
 99:                   
100:                   {/* Difficulty Pill */}
101:                   <span className={`absolute top-4 right-4 text-xs font-black tracking-wide px-3 py-1.5 
102:                                     rounded-full shadow-md uppercase ${diffStyle[ride.difficulty]}`}>
103:                     {ride.difficulty}
104:                   </span>
105: 
106:                   {/* Title & Route inside image at bottom */}
107:                   <div className="absolute bottom-4 left-5 right-5">
108:                     <h2 className="text-2xl font-black text-white leading-tight mb-1">
109:                       {ride.title}
110:                     </h2>
111:                     <div className="text-sm font-semibold text-white/80 flex items-center gap-1.5">
112:                       <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
113:                         <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
114:                       </svg>
115:                       {ride.route}
116:                     </div>
117:                   </div>
118:                 </div>
119: 
120:                 {/* Body Details */}
121:                 <div className="flex flex-col flex-1 p-6 space-y-4">
122:                   {/* Quick specs grid */}
123:                   <div className="grid grid-cols-2 gap-4">
124:                     <div className="flex items-center gap-2">
125:                       <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
126:                         <DistanceIcon />
127:                       </div>
128:                       <div>
129:                         <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Distance</p>
130:                         <p className="text-sm text-brand-black font-black">{ride.distance}</p>
131:                       </div>
132:                     </div>
133:                     <div className="flex items-center gap-2">
134:                       <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
135:                         <DurationIcon />
136:                       </div>
137:                       <div>
138:                         <p className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">Duration</p>
139:                         <p className="text-sm text-brand-black font-black">{ride.duration}</p>
140:                       </div>
141:                     </div>
142:                   </div>
143: 
144:                   {/* Bike info */}
145:                   <div className="flex items-center gap-3 bg-brand-light rounded-xl p-3 border border-gray-100">
146:                     <BikeIcon />
147:                     <p className="text-xs font-bold text-brand-black">{ride.bike}</p>
148:                   </div>
149: 
150:                   <div className="flex-1"></div>
151: 
152:                   {/* Price + CTA */}
153:                   <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
154:                     <div>
155:                       <p className="text-2xl font-black text-brand-orange">{ride.price}</p>
156:                       <p className="text-[11px] font-bold text-brand-gray uppercase tracking-wide">Ready to Ride</p>
157:                     </div>
158:                     <Link
159:                       href={`/ride/${ride.slug}`}
160:                       className="inline-flex items-center gap-2 bg-brand-black text-white font-black text-sm
161:                                  px-6 py-3 rounded-full transition-all duration-300
162:                                  hover:bg-brand-orange hover:shadow-orange-glow active:scale-95"
163:                     >
164:                       View Details
165:                       <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
166:                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
167:                       </svg>
168:                     </Link>
169:                   </div>
170:                 </div>
171:               </article>
172:             ))}
173:           </div>
174:         </section>
175: 
176:       </main>
177: 
178:       <Footer />
179:     </>
180:   );
181: }
````

## File: app/travel/[slug]/booking/page.js
````javascript
 1: /**
 2:  * app/travel/[slug]/booking/page.js
 3:  * Booking Page — Server Component (SSR)
 4:  * Route: /travel/[slug]/booking
 5:  */
 6: 
 7: import Link from 'next/link';
 8: import { notFound } from 'next/navigation';
 9: import Navbar from '@/app/components/Navbar';
10: import Footer from '@/app/components/Footer';
11: import { getTravelDestinationBySlug } from '@/common/helper';
12: import BookingForm from '@/common/components/BookingForm';
13: 
14: export async function generateMetadata({ params }) {
15:   const dest = getTravelDestinationBySlug(params.slug);
16:   if (!dest) return { title: 'Package Not Found — Travel • Trek • Ride' };
17:   return {
18:     title: `Book ${dest.title} — Travel • Trek • Ride`,
19:     description: `Book ${dest.title} for ${dest.price}/person. Fill your details and pay via UPI instantly.`,
20:   };
21: }
22: 
23: export default async function BookingPage({ params }) {
24:   const dest = getTravelDestinationBySlug(params.slug);
25:   if (!dest) notFound();
26: 
27:   return (
28:     <>
29:       <Navbar />
30:       <main className="min-h-screen bg-brand-light">
31: 
32:         {/* ── Page Header ──────────────────────────────────── */}
33:         <section className="relative overflow-hidden py-14
34:                             bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue">
35:           <div className="absolute inset-0 opacity-5 pointer-events-none"
36:                style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
37:           <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
38:             {/* Breadcrumb */}
39:             <nav className="flex items-center gap-2 text-white/50 text-sm font-medium mb-5">
40:               <Link href="/" className="hover:text-white transition-colors">Home</Link>
41:               <span>/</span>
42:               <Link href="/travel" className="hover:text-white transition-colors">Travel</Link>
43:               <span>/</span>
44:               <Link href={`/travel/${dest.slug}`}
45:                     className="hover:text-white transition-colors truncate">
46:                 {dest.title}
47:               </Link>
48:               <span>/</span>
49:               <span className="text-brand-orange font-bold">Book Now</span>
50:             </nav>
51: 
52:             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
53:               <div>
54:                 <span className="inline-block bg-orange-500/20 text-brand-orange text-xs font-bold
55:                                  px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
56:                   Secure Booking
57:                 </span>
58:                 <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
59:                   {dest.title}
60:                 </h1>
61:                 <p className="text-white/60 font-medium mt-1">
62:                   {dest.days} Days / {dest.nights} Nights · {dest.location}
63:                 </p>
64:               </div>
65:               <div className="text-right">
66:                 <p className="text-4xl font-black text-brand-orange">{dest.price}</p>
67:                 <p className="text-white/50 text-sm font-medium">per person</p>
68:               </div>
69:             </div>
70:           </div>
71:         </section>
72: 
73:         {/* ── Form + Summary ───────────────────────────────── */}
74:         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
75:           <BookingForm destination={dest} />
76:         </div>
77: 
78:       </main>
79:       <Footer />
80:     </>
81:   );
82: }
````

## File: app/travel/[slug]/page.js
````javascript
  1: /**
  2:  * app/travel/[slug]/page.js
  3:  * Dynamic Travel Package Details Page — Server Component (SSR)
  4:  * Route: /travel/[slug]
  5:  */
  6: 
  7: import Link from 'next/link';
  8: import { notFound } from 'next/navigation';
  9: import Navbar from '@/app/components/Navbar';
 10: import Footer from '@/app/components/Footer';
 11: import BookingCard from '@/common/components/BookingCard';
 12: import FAQSection  from '@/common/components/FAQSection';
 13: import { getTravelDestinations, getTravelDestinationBySlug } from '@/common/helper';
 14: 
 15: // ── Static Params for SSG/SSR ────────────────────────────────
 16: export async function generateStaticParams() {
 17:   return getTravelDestinations().map((d) => ({ slug: d.slug }));
 18: }
 19: 
 20: // ── Dynamic Metadata ─────────────────────────────────────────
 21: export async function generateMetadata({ params }) {
 22:   const dest = getTravelDestinationBySlug(params.slug);
 23:   if (!dest) return { title: 'Package Not Found — Travel • Trek • Ride' };
 24:   return {
 25:     title: `${dest.title} — ${dest.price} | Travel • Trek • Ride`,
 26:     description: dest.description.slice(0, 155),
 27:   };
 28: }
 29: 
 30: // ── Difficulty Style ─────────────────────────────────────────
 31: const diffStyle = {
 32:   Easy:     'bg-green-100 text-green-700',
 33:   Moderate: 'bg-yellow-100 text-yellow-700',
 34:   Hard:     'bg-red-100 text-red-700',
 35: };
 36: 
 37: // ── Page ─────────────────────────────────────────────────────
 38: export default async function PackageDetailsPage({ params }) {
 39:   const dest = getTravelDestinationBySlug(params.slug);
 40:   if (!dest) notFound();
 41: 
 42:   const {
 43:     title, location, image, price, originalPrice, days, nights,
 44:     rating, reviews, difficulty, category, badge, badgeColor,
 45:     description, highlights, itinerary, inclusions, exclusions,
 46:     galleryImages, faqs, includes: includesList,
 47:   } = dest;
 48: 
 49:   return (
 50:     <>
 51:       <Navbar />
 52:       <main className="min-h-screen bg-brand-light">
 53: 
 54:         {/* ══════════════════════════════════════
 55:             1. HERO SECTION
 56:         ══════════════════════════════════════ */}
 57:         <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
 58:           <img src={image} alt={title}
 59:                className="absolute inset-0 w-full h-full object-cover" loading="eager" />
 60:           {/* Dark overlay */}
 61:           <div className="absolute inset-0 bg-gradient-to-t
 62:                           from-brand-black/90 via-brand-black/40 to-brand-black/20" />
 63: 
 64:           <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
 65:             {/* Breadcrumb */}
 66:             <nav className="flex items-center gap-2 text-white/60 text-sm font-medium mb-4">
 67:               <Link href="/" className="hover:text-white transition-colors">Home</Link>
 68:               <span>/</span>
 69:               <Link href="/travel" className="hover:text-white transition-colors">Travel</Link>
 70:               <span>/</span>
 71:               <span className="text-brand-orange font-bold truncate">{title}</span>
 72:             </nav>
 73: 
 74:             {/* Badges row */}
 75:             <div className="flex flex-wrap gap-2 mb-4">
 76:               <span className={`${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
 77:                 {badge}
 78:               </span>
 79:               <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
 80:                 {category}
 81:               </span>
 82:               <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffStyle[difficulty]}`}>
 83:                 {difficulty}
 84:               </span>
 85:             </div>
 86: 
 87:             {/* Title */}
 88:             <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white
 89:                            leading-tight mb-3 max-w-3xl">
 90:               {title}
 91:             </h1>
 92: 
 93:             {/* Meta row */}
 94:             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
 95:               <span className="flex items-center gap-1">
 96:                 <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
 97:                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
 98:                 </svg>
 99:                 {location}
100:               </span>
101:               <span className="flex items-center gap-1">
102:                 <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
103:                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
104:                 </svg>
105:                 {days}D / {nights}N
106:               </span>
107:               <span className="flex items-center gap-1 text-amber-400">
108:                 ★ {rating}
109:                 <span className="text-white/50 ml-1">({reviews} reviews)</span>
110:               </span>
111:               {/* Hero Price */}
112:               <span className="text-2xl font-black text-brand-orange ml-auto">
113:                 {price} <span className="text-sm font-medium text-white/50">/ person</span>
114:               </span>
115:             </div>
116:           </div>
117:         </section>
118: 
119:         {/* ══════════════════════════════════════
120:             2. MAIN CONTENT — Two Column Layout
121:         ══════════════════════════════════════ */}
122:         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
123:           <div className="flex flex-col lg:flex-row gap-8">
124: 
125:             {/* ────── LEFT COLUMN (70%) ────── */}
126:             <div className="flex-1 min-w-0 space-y-10">
127: 
128:               {/* About This Trip */}
129:               <section id="about" aria-labelledby="about-heading">
130:                 <h2 id="about-heading"
131:                     className="text-2xl font-extrabold text-brand-black mb-4 flex items-center gap-2">
132:                   <span className="w-1 h-7 bg-brand-orange rounded-full block" />
133:                   About This Trip
134:                 </h2>
135:                 <p className="text-brand-gray font-medium leading-relaxed text-base">
136:                   {description}
137:                 </p>
138:               </section>
139: 
140:               {/* Highlights */}
141:               <section id="highlights" aria-labelledby="highlights-heading">
142:                 <h2 id="highlights-heading"
143:                     className="text-2xl font-extrabold text-brand-black mb-5 flex items-center gap-2">
144:                   <span className="w-1 h-7 bg-brand-orange rounded-full block" />
145:                   Trip Highlights
146:                 </h2>
147:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
148:                   {highlights.map((h) => (
149:                     <div key={h} className="flex items-center gap-3 bg-white rounded-2xl
150:                                             px-4 py-3 shadow-sm border border-gray-100
151:                                             hover:border-brand-orange/30 hover:shadow-md
152:                                             transition-all duration-200">
153:                       <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center
154:                                        justify-center flex-shrink-0">
155:                         <svg className="w-3.5 h-3.5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
156:                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
157:                         </svg>
158:                       </span>
159:                       <span className="text-brand-black font-semibold text-sm">{h}</span>
160:                     </div>
161:                   ))}
162:                 </div>
163:               </section>
164: 
165:               {/* Itinerary */}
166:               <section id="itinerary" aria-labelledby="itinerary-heading">
167:                 <h2 id="itinerary-heading"
168:                     className="text-2xl font-extrabold text-brand-black mb-6 flex items-center gap-2">
169:                   <span className="w-1 h-7 bg-brand-orange rounded-full block" />
170:                   Day-by-Day Itinerary
171:                 </h2>
172:                 <div className="space-y-4">
173:                   {itinerary.map((day, i) => (
174:                     <div key={day.day}
175:                          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
176:                                     hover:shadow-md hover:border-brand-orange/20 transition-all duration-200">
177:                       {/* Day header */}
178:                       <div className="flex items-center gap-4 p-5 bg-gradient-to-r
179:                                       from-blue-50 to-orange-50 border-b border-gray-100">
180:                         <span className="w-12 h-12 rounded-2xl bg-brand-orange text-white
181:                                          font-black text-lg flex items-center justify-center flex-shrink-0
182:                                          shadow-orange-glow">
183:                           D{day.day}
184:                         </span>
185:                         <div>
186:                           <p className="text-xs text-brand-orange font-bold uppercase tracking-wide">
187:                             Day {day.day}
188:                           </p>
189:                           <h3 className="text-brand-black font-extrabold text-base">{day.title}</h3>
190:                         </div>
191:                       </div>
192:                       {/* Activities */}
193:                       <ul className="p-5 space-y-2">
194:                         {day.activities.map((act, j) => (
195:                           <li key={j} className="flex items-start gap-2.5 text-sm text-brand-gray font-medium">
196:                             <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
197:                             {act}
198:                           </li>
199:                         ))}
200:                       </ul>
201:                     </div>
202:                   ))}
203:                 </div>
204:               </section>
205: 
206:               {/* Inclusions & Exclusions */}
207:               <section id="inclusions" aria-labelledby="incl-heading">
208:                 <h2 id="incl-heading"
209:                     className="text-2xl font-extrabold text-brand-black mb-5 flex items-center gap-2">
210:                   <span className="w-1 h-7 bg-brand-orange rounded-full block" />
211:                   Inclusions &amp; Exclusions
212:                 </h2>
213:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
214:                   {/* Inclusions */}
215:                   <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
216:                     <h3 className="font-extrabold text-green-700 mb-4 flex items-center gap-2">
217:                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
218:                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
219:                       </svg>
220:                       What&apos;s Included
221:                     </h3>
222:                     <ul className="space-y-2">
223:                       {inclusions.map((inc) => (
224:                         <li key={inc} className="flex items-start gap-2 text-sm text-green-800 font-medium">
225:                           <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
226:                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
227:                           </svg>
228:                           {inc}
229:                         </li>
230:                       ))}
231:                     </ul>
232:                   </div>
233:                   {/* Exclusions */}
234:                   <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
235:                     <h3 className="font-extrabold text-red-700 mb-4 flex items-center gap-2">
236:                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
237:                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
238:                       </svg>
239:                       Not Included
240:                     </h3>
241:                     <ul className="space-y-2">
242:                       {exclusions.map((ex) => (
243:                         <li key={ex} className="flex items-start gap-2 text-sm text-red-800 font-medium">
244:                           <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
245:                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
246:                           </svg>
247:                           {ex}
248:                         </li>
249:                       ))}
250:                     </ul>
251:                   </div>
252:                 </div>
253:               </section>
254: 
255:             </div>{/* end left col */}
256: 
257:             {/* ────── RIGHT COLUMN — Booking Card (30%) ────── */}
258:             <aside className="lg:w-80 xl:w-96 flex-shrink-0">
259:               <BookingCard
260:                 price={price}
261:                 originalPrice={originalPrice}
262:                 days={days}
263:                 nights={nights}
264:                 title={title}
265:                 slug={dest.slug}
266:               />
267:             </aside>
268: 
269:           </div>
270:         </div>
271: 
272:         {/* ══════════════════════════════════════
273:             3. WHY BOOK WITH US
274:         ══════════════════════════════════════ */}
275:         <section id="why-us" className="py-16 bg-white" aria-labelledby="why-heading">
276:           <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
277:             <span className="inline-block bg-blue-50 text-brand-blue text-sm font-bold
278:                              px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
279:               Why us?
280:             </span>
281:             <h2 id="why-heading"
282:                 className="text-3xl font-extrabold text-brand-black mb-10">
283:               Why Book With Travel • Trek • Ride?
284:             </h2>
285:             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
286:               {[
287:                 { emoji: '💰', title: 'Budget Friendly', desc: 'Best prices guaranteed with 0% EMI. No hidden charges — what you see is what you pay.' },
288:                 { emoji: '🧭', title: 'Expert Guides', desc: 'Local, certified guides with 5+ years of experience ensure a safe and enriching journey.' },
289:                 { emoji: '🛡️', title: 'Safe Travel', desc: '24/7 on-trip support, verified accommodations, and emergency protocols for your peace of mind.' },
290:               ].map((card) => (
291:                 <div key={card.title}
292:                      className="bg-brand-light rounded-3xl p-7 text-center border border-gray-100
293:                                 hover:shadow-card hover:border-brand-orange/20 hover:scale-[1.03]
294:                                 transition-all duration-300">
295:                   <span className="text-5xl block mb-4">{card.emoji}</span>
296:                   <h3 className="text-brand-black font-extrabold text-lg mb-2">{card.title}</h3>
297:                   <p className="text-brand-gray text-sm font-medium leading-relaxed">{card.desc}</p>
298:                 </div>
299:               ))}
300:             </div>
301:           </div>
302:         </section>
303: 
304:         {/* ══════════════════════════════════════
305:             4. PHOTO GALLERY
306:         ══════════════════════════════════════ */}
307:         <section id="gallery" className="py-16 bg-brand-light" aria-labelledby="gallery-heading">
308:           <div className="max-w-6xl mx-auto px-4 sm:px-6">
309:             <div className="text-center mb-8">
310:               <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
311:                                px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">Gallery</span>
312:               <h2 id="gallery-heading" className="text-3xl font-extrabold text-brand-black">
313:                 Trip Photos
314:               </h2>
315:             </div>
316:             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
317:               {galleryImages.map((src, i) => (
318:                 <div key={i}
319:                      className="aspect-square overflow-hidden rounded-2xl shadow-sm
320:                                 hover:shadow-card-hover hover:scale-[1.02]
321:                                 transition-all duration-300">
322:                   <img src={src} alt={`${title} gallery photo ${i + 1}`}
323:                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
324:                        loading="lazy" />
325:                 </div>
326:               ))}
327:             </div>
328:           </div>
329:         </section>
330: 
331:         {/* ══════════════════════════════════════
332:             5. FAQ (Client Component)
333:         ══════════════════════════════════════ */}
334:         <FAQSection faqs={faqs} />
335: 
336:         {/* ══════════════════════════════════════
337:             6. FINAL CTA
338:         ══════════════════════════════════════ */}
339:         <section id="final-cta"
340:                  className="py-20 bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue
341:                             relative overflow-hidden text-center">
342:           <div className="absolute inset-0 opacity-5 pointer-events-none"
343:                style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
344:           <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
345:             <span className="text-5xl block mb-6">🏔️</span>
346:             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
347:               Ready to Explore{' '}
348:               <span className="text-gradient-orange">{title.split(' ')[0]}?</span>
349:             </h2>
350:             <p className="text-white/70 font-medium text-lg mb-10">
351:               Seats fill fast. Reserve yours today and pay the rest later with 0% EMI.
352:             </p>
353:             <div className="flex flex-col sm:flex-row gap-4 justify-center">
354:               <Link href="/travel"
355:                     className="inline-flex items-center justify-center gap-2
356:                                border-2 border-white/40 text-white font-bold text-base
357:                                px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
358:                 ← Back to All Trips
359:               </Link>
360:               <Link href={`/travel/${dest.slug}/booking`}
361:                     id="reserve-seat-btn"
362:                     className="inline-flex items-center justify-center gap-2
363:                                bg-brand-orange text-white font-black text-base
364:                                px-8 py-4 rounded-full shadow-orange-glow
365:                                transition-all duration-300
366:                                hover:bg-brand-orange-hover hover:scale-105 hover:shadow-xl">
367:                 🎒 Reserve Your Seat
368:               </Link>
369:             </div>
370:           </div>
371:         </section>
372: 
373:       </main>
374:       <Footer />
375:     </>
376:   );
377: }
````

## File: app/travel/components/TravelExpertCTA.js
````javascript
  1: /**
  2:  * app/travel/components/TravelExpertCTA.js
  3:  * ─────────────────────────────────────────────────────────────
  4:  * Travel Page — "Talk to a Travel Expert" CTA Section (Server Component)
  5:  * Full-width dark blue section with Chat & Call buttons at page bottom.
  6:  * ─────────────────────────────────────────────────────────────
  7:  */
  8: 
  9: import Link from 'next/link';
 10: 
 11: export default function TravelExpertCTA() {
 12:   return (
 13:     <section
 14:       id="travel-expert"
 15:       className="py-20 md:py-28 bg-gradient-to-br
 16:                  from-brand-blue via-brand-blue-dark to-blue-950
 17:                  relative overflow-hidden"
 18:       aria-labelledby="expert-heading"
 19:     >
 20:       {/* ── Decorative Circles ── */}
 21:       <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full
 22:                       -translate-y-1/3 translate-x-1/3 pointer-events-none" />
 23:       <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full
 24:                       translate-y-1/3 -translate-x-1/3 pointer-events-none" />
 25: 
 26:       {/* ── Dot Grid Background ── */}
 27:       <div
 28:         className="absolute inset-0 opacity-5 pointer-events-none"
 29:         aria-hidden="true"
 30:         style={{
 31:           backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
 32:           backgroundSize: '28px 28px',
 33:         }}
 34:       />
 35: 
 36:       {/* ── Content ── */}
 37:       <div className="relative text-center max-w-3xl mx-auto px-4 sm:px-6">
 38: 
 39:         {/* Icon */}
 40:         <div className="inline-flex items-center justify-center w-20 h-20
 41:                         bg-white/10 backdrop-blur-sm rounded-2xl mb-8
 42:                         border border-white/20">
 43:           <svg className="w-10 h-10 text-brand-orange" fill="none"
 44:                stroke="currentColor" viewBox="0 0 24 24">
 45:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
 46:                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8
 47:                      a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042
 48:                      3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
 49:           </svg>
 50:         </div>
 51: 
 52:         {/* Heading */}
 53:         <h2
 54:           id="expert-heading"
 55:           className="text-3xl sm:text-4xl md:text-5xl font-black text-white
 56:                      leading-tight mb-4"
 57:         >
 58:           Not sure where to go?
 59:         </h2>
 60: 
 61:         {/* Body text */}
 62:         <p className="text-xl text-white/80 font-medium max-w-xl mx-auto mb-3">
 63:           Talk to our travel expert — we&apos;ll plan the perfect trip just for you.
 64:         </p>
 65:         <p className="text-white/50 text-sm font-medium mb-12">
 66:           Free consultation &nbsp;•&nbsp; 24/7 support &nbsp;•&nbsp; Customized itineraries
 67:         </p>
 68: 
 69:         {/* Perks row */}
 70:         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
 71:           {[
 72:             { icon: '💬', label: 'Free Consultation', val: 'No Cost' },
 73:             { icon: '🗺️', label: 'Custom Itinerary',  val: 'Built for You' },
 74:             { icon: '⏰', label: '24/7 Support',      val: 'Always Available' },
 75:           ].map((p) => (
 76:             <div key={p.label}
 77:                  className="bg-white/5 backdrop-blur-sm border border-white/10
 78:                             rounded-2xl py-4 px-3 text-center">
 79:               <span className="text-2xl block mb-1">{p.icon}</span>
 80:               <p className="text-brand-orange font-black text-sm">{p.val}</p>
 81:               <p className="text-white/50 text-xs font-medium mt-0.5">{p.label}</p>
 82:             </div>
 83:           ))}
 84:         </div>
 85: 
 86:         {/* CTA Buttons */}
 87:         <div className="flex flex-col sm:flex-row gap-4 justify-center">
 88:           <Link
 89:             href="/"
 90:             id="expert-chat-btn"
 91:             className="inline-flex items-center justify-center gap-2
 92:                        bg-brand-orange text-white font-bold text-base
 93:                        px-8 py-4 rounded-full shadow-orange-glow
 94:                        transition-all duration-300
 95:                        hover:bg-brand-orange-hover hover:scale-105 hover:shadow-xl
 96:                        active:scale-95"
 97:           >
 98:             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 99:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
100:                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8
101:                        a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042
102:                        3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
103:             </svg>
104:             Chat with Expert
105:           </Link>
106: 
107:           <Link
108:             href="tel:+918800000000"
109:             id="expert-call-btn"
110:             className="inline-flex items-center justify-center gap-2
111:                        border-2 border-white text-white font-bold text-base
112:                        px-8 py-4 rounded-full
113:                        transition-all duration-300
114:                        hover:bg-white hover:text-brand-blue hover:scale-105
115:                        active:scale-95"
116:           >
117:             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
118:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
119:                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0
120:                        01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1
121:                        1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1
122:                        C9.716 21 3 14.284 3 6V5z" />
123:             </svg>
124:             Call Now
125:           </Link>
126:         </div>
127:       </div>
128:     </section>
129:   );
130: }
````

## File: app/travel/components/TravelGrid.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * app/travel/components/TravelGrid.js
  5:  * ─────────────────────────────────────────────────────────────
  6:  * Travel Page — Destination Cards Grid
  7:  * 'use client' — category filter buttons use useState for live filtering.
  8:  * Data (destinations + categories) is passed as props from SSR page.js.
  9:  * ─────────────────────────────────────────────────────────────
 10:  */
 11: 
 12: import { useState, useMemo } from 'react';
 13: import Link from 'next/link';
 14: 
 15: // ── Difficulty badge colors ───────────────────────────────────
 16: const difficultyStyle = {
 17:   Easy:     'bg-green-100 text-green-700',
 18:   Moderate: 'bg-yellow-100 text-yellow-700',
 19:   Hard:     'bg-red-100   text-red-700',
 20: };
 21: 
 22: // ── Star Rating ───────────────────────────────────────────────
 23: function StarRating({ rating, reviews }) {
 24:   const full  = Math.floor(rating);
 25:   const half  = rating % 1 >= 0.5;
 26:   const empty = 5 - full - (half ? 1 : 0);
 27: 
 28:   return (
 29:     <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5`}>
 30:       <span className="text-amber-400 text-sm tracking-tighter">
 31:         {'★'.repeat(full)}
 32:         {half ? '⯨' : ''}
 33:         <span className="text-gray-300">{'★'.repeat(empty)}</span>
 34:       </span>
 35:       <span className="text-xs text-brand-gray font-medium">
 36:         {rating} ({reviews})
 37:       </span>
 38:     </div>
 39:   );
 40: }
 41: 
 42: // ── Single Destination Card ───────────────────────────────────
 43: function DestinationCard({ destination }) {
 44:   const {
 45:     slug, title, location, image, price, originalPrice,
 46:     days, nights, highlights, badge, badgeColor,
 47:     rating, reviews, category, difficulty, inclusions,
 48:   } = destination;
 49: 
 50:   return (
 51:     <article
 52:       className="group bg-white rounded-3xl overflow-hidden shadow-card
 53:                  hover:shadow-card-hover hover:scale-[1.03]
 54:                  transition-all duration-300 flex flex-col h-full"
 55:       aria-label={`${title} — ${price}`}
 56:     >
 57:       {/* Image */}
 58:       <div className="relative h-52 overflow-hidden flex-shrink-0">
 59:         <img
 60:           src={image}
 61:           alt={`${title} — ${location}`}
 62:           className="w-full h-full object-cover transition-transform
 63:                      duration-700 group-hover:scale-110"
 64:           loading="lazy"
 65:         />
 66:         {/* Badge */}
 67:         <span className={`absolute top-3 left-3 ${badgeColor} text-white
 68:                           text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
 69:           {badge}
 70:         </span>
 71:         {/* Category */}
 72:         <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm
 73:                          text-brand-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
 74:           {Array.isArray(category) ? category.length > 0 ? category[0] : '' : category}
 75:         </span>
 76:         {/* Duration */}
 77:         <span className="absolute bottom-3 left-3 flex items-center gap-1.5
 78:                          bg-black/60 backdrop-blur-sm text-white
 79:                          text-xs font-semibold px-3 py-1.5 rounded-full">
 80:           <svg className="w-3.5 h-3.5 text-brand-orange"
 81:                fill="none" stroke="currentColor" viewBox="0 0 24 24">
 82:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 83:                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 84:           </svg>
 85:           {days}D / {nights}N
 86:         </span>
 87:         {/* Bottom gradient */}
 88:         <div className="absolute bottom-0 inset-x-0 h-16
 89:                         bg-gradient-to-t from-black/50 to-transparent" />
 90:       </div>
 91: 
 92:       {/* Body */}
 93:       <div className="flex flex-col flex-1 p-5">
 94:         {/* Location */}
 95:         <div className="flex items-center gap-1 text-brand-gray text-xs font-medium mb-1.5">
 96:           <svg className="w-3.5 h-3.5 text-brand-orange flex-shrink-0"
 97:                fill="currentColor" viewBox="0 0 20 20">
 98:             <path fillRule="evenodd"
 99:                   d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
100:                   clipRule="evenodd" />
101:           </svg>
102:           <span className="truncate">{location}</span>
103:         </div>
104: 
105:         {/* Title */}
106:         <h2 className="text-lg font-extrabold text-brand-black leading-snug mb-2
107:                        group-hover:text-brand-blue transition-colors duration-300">
108:           {title}
109:         </h2>
110: 
111:         {/* Rating */}
112:         <StarRating rating={rating} reviews={reviews} />
113: 
114:         {/* Difficulty */}
115:         <span className={`mt-2 inline-block text-xs font-bold px-2.5 py-0.5
116:                           rounded-full w-fit ${difficultyStyle[difficulty]}`}>
117:           {difficulty}
118:         </span>
119: 
120:         {/* Highlights */}
121:         <ul className="mt-3 space-y-1 flex-1" aria-label="Trip highlights">
122:           {highlights.slice(0, 3).map((h) => (
123:             <li key={h} className="flex items-start gap-2 text-xs text-brand-gray font-medium">
124:               <svg className="w-3.5 h-3.5 text-brand-orange mt-0.5 flex-shrink-0"
125:                    fill="currentColor" viewBox="0 0 20 20">
126:                 <path fillRule="evenodd"
127:                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
128:                       clipRule="evenodd" />
129:               </svg>
130:               {h}
131:             </li>
132:           ))}
133:         </ul>
134: 
135:         {/* Includes tags */}
136:         <div className="flex flex-wrap gap-1.5 mt-3">
137:           {(inclusions || []).slice(0, 3).map((inc) => (
138:             <span key={inc}
139:                   className="bg-blue-50 text-brand-blue text-xs font-semibold
140:                              px-2 py-0.5 rounded-lg">
141:               {inc}
142:             </span>
143:           ))}
144:         </div>
145: 
146:         {/* Price + CTA */}
147:         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
148:           <div>
149:             <p className="text-2xl font-black text-brand-orange leading-none">{price}</p>
150:             <p className="text-xs text-brand-gray line-through mt-0.5">{originalPrice}</p>
151:             <p className="text-xs text-green-600 font-semibold">per person</p>
152:           </div>
153:           <Link
154:             href={`/travel/${slug}`}
155:             id={`view-details-${slug}`}
156:             className="inline-flex items-center gap-1.5
157:                        bg-brand-orange text-white font-bold text-sm
158:                        px-4 py-2.5 rounded-full shadow-orange-glow
159:                        transition-all duration-300
160:                        hover:bg-brand-orange-hover hover:scale-105
161:                        active:scale-95"
162:             aria-label={`View details for ${title}`}
163:           >
164:             View Details
165:             <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
166:                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
167:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
168:                     d="M13 7l5 5m0 0l-5 5m5-5H6" />
169:             </svg>
170:           </Link>
171:         </div>
172:       </div>
173:     </article>
174:   );
175: }
176: 
177: // ── Empty State ───────────────────────────────────────────────
178: function EmptyState({ category }) {
179:   return (
180:     <div className="col-span-full flex flex-col items-center justify-center
181:                     py-24 text-center">
182:       <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center
183:                       justify-center text-4xl mb-5">
184:         🗺️
185:       </div>
186:       <h3 className="text-xl font-extrabold text-brand-black mb-2">
187:         No packages found for &quot;{category}&quot;
188:       </h3>
189:       <p className="text-brand-gray font-medium text-sm max-w-xs">
190:         We&apos;re adding more destinations soon. Try a different category!
191:       </p>
192:     </div>
193:   );
194: }
195: 
196: // ── Main Component ────────────────────────────────────────────
197: export default function TravelGrid({ destinations, categories }) {
198:   // Active category state — default "All"
199:   const [activeCategory, setActiveCategory] = useState('All');
200: 
201:   // Filtered destinations — recomputed only when activeCategory changes
202:   const filtered = useMemo(() => {
203:     if (activeCategory === 'All') return destinations;
204:     const lowerActive = activeCategory.toLowerCase();
205:     return destinations.filter((d) => 
206:       Array.isArray(d.category) ? d.category.includes(lowerActive) : d.category === lowerActive
207:     );
208:   }, [activeCategory, destinations]);
209: 
210:   return (
211:     <section
212:       id="all-packages"
213:       className="py-16 md:py-24 bg-brand-light"
214:       aria-labelledby="packages-heading"
215:     >
216:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
217: 
218:         {/* ── Section Header ── */}
219:         <div className="text-center mb-10">
220:           <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
221:                            px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
222:             All Packages
223:           </span>
224:           <h2
225:             id="packages-heading"
226:             className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black mb-3"
227:           >
228:             All Travel Packages
229:           </h2>
230:           <p className="text-brand-gray font-medium text-lg max-w-xl mx-auto">
231:             Every journey starts with a single step. Pick yours.
232:           </p>
233:         </div>
234: 
235:         {/* ── Category Filter Buttons ── */}
236:         <div
237:           className="flex flex-wrap gap-2 justify-center mb-12"
238:           role="tablist"
239:           aria-label="Filter destinations by category"
240:         >
241:           {categories.map((cat) => {
242:             const isActive = activeCategory === cat;
243:             return (
244:               <button
245:                 key={cat}
246:                 id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
247:                 role="tab"
248:                 aria-selected={isActive}
249:                 onClick={() => setActiveCategory(cat)}
250:                 className={`px-5 py-2 rounded-full text-sm font-bold border-2
251:                             transition-all duration-200 cursor-pointer
252:                             focus:outline-none focus:ring-2 focus:ring-brand-orange/50
253:                             hover:scale-105 active:scale-95
254:                             ${isActive
255:                               ? 'bg-brand-orange border-brand-orange text-white shadow-orange-glow scale-105'
256:                               : 'border-gray-200 text-brand-gray bg-white hover:border-brand-orange hover:text-brand-orange'
257:                             }`}
258:               >
259:                 {cat}
260:                 {/* Show count per category */}
261:                 <span className={`ml-1.5 text-xs font-semibold
262:                                   ${isActive ? 'text-white/80' : 'text-brand-gray/60'}`}>
263:                   ({cat === 'All'
264:                     ? destinations.length
265:                     : destinations.filter((d) => d.category === cat).length})
266:                 </span>
267:               </button>
268:             );
269:           })}
270:         </div>
271: 
272:         {/* ── Filtered Result Label ── */}
273:         <div className="flex items-center justify-between mb-6 px-1">
274:           <p className="text-brand-gray text-sm font-medium">
275:             Showing{' '}
276:             <span className="font-extrabold text-brand-black">{filtered.length}</span>{' '}
277:             {activeCategory === 'All' ? 'destinations' : `"${activeCategory}" packages`}
278:           </p>
279:           {/* Clear filter — shown only when a category is active */}
280:           {activeCategory !== 'All' && (
281:             <button
282:               onClick={() => setActiveCategory('All')}
283:               className="text-xs text-brand-orange font-bold hover:underline
284:                          flex items-center gap-1 transition-opacity"
285:               aria-label="Clear filter"
286:             >
287:               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
288:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
289:                       d="M6 18L18 6M6 6l12 12" />
290:               </svg>
291:               Clear filter
292:             </button>
293:           )}
294:         </div>
295: 
296:         {/* ── Cards Grid ── */}
297:         <div
298:           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
299:           role="tabpanel"
300:           aria-live="polite"
301:           aria-label={`${activeCategory} destination packages`}
302:         >
303:           {filtered.length > 0
304:             ? filtered.map((destination) => (
305:                 <DestinationCard key={destination.id} destination={destination} />
306:               ))
307:             : <EmptyState category={activeCategory} />
308:           }
309:         </div>
310:       </div>
311:     </section>
312:   );
313: }
````

## File: app/travel/components/TravelHero.js
````javascript
  1: /**
  2:  * app/travel/components/TravelHero.js
  3:  * ─────────────────────────────────────────────────────────────
  4:  * Travel Page — Hero Section (Server Component)
  5:  * Full-viewport header with background image, heading, breadcrumb & stats.
  6:  * ─────────────────────────────────────────────────────────────
  7:  */
  8: 
  9: import Link from 'next/link';
 10: 
 11: export default function TravelHero({ totalDestinations = 10 }) {
 12:   return (
 13:     <section
 14:       className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
 15:       aria-label="Travel page hero"
 16:     >
 17:       {/* ── Background Image ── */}
 18:       <div className="absolute inset-0 z-0">
 19:         <img
 20:           src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80&auto=format&fit=crop"
 21:           alt="World travel destinations collage with map and camera"
 22:           className="w-full h-full object-cover object-center"
 23:           loading="eager"
 24:           fetchPriority="high"
 25:         />
 26:         {/* Dark overlay */}
 27:         <div className="absolute inset-0 bg-gradient-to-b
 28:                         from-brand-black/60 via-brand-black/55 to-brand-black/75" />
 29:         {/* Blue tint */}
 30:         <div className="absolute inset-0 bg-brand-blue/20" />
 31:       </div>
 32: 
 33:       {/* ── Hero Content ── */}
 34:       <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-28 pb-20">
 35: 
 36:         {/* Breadcrumb */}
 37:         <nav
 38:           className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium mb-6"
 39:           aria-label="Breadcrumb"
 40:         >
 41:           <Link href="/" className="hover:text-white transition-colors duration-200">
 42:             Home
 43:           </Link>
 44:           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 45:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 46:           </svg>
 47:           <span className="text-brand-orange font-bold">Travel</span>
 48:         </nav>
 49: 
 50:         {/* Live badge */}
 51:         <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
 52:                         border border-white/20 text-white text-sm font-semibold
 53:                         px-4 py-2 rounded-full mb-6">
 54:           <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
 55:           {totalDestinations} Handpicked Destinations
 56:         </div>
 57: 
 58:         {/* Main Heading */}
 59:         <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white
 60:                        leading-tight tracking-tight mb-5">
 61:           Discover Amazing{' '}
 62:           <span className="text-gradient-orange">Travel</span>{' '}
 63:           Destinations
 64:         </h1>
 65: 
 66:         {/* Sub Heading */}
 67:         <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10">
 68:           Handpicked trips across India &amp; abroad &nbsp;•&nbsp;
 69:           <span className="text-brand-orange font-semibold">Explore. Earn. Experience.</span>
 70:         </p>
 71: 
 72:         {/* Quick Stats */}
 73:         <div className="flex flex-wrap justify-center gap-10">
 74:           {[
 75:             { val: `${totalDestinations}+`, label: 'Destinations' },
 76:             { val: '₹6,499',               label: 'Starting From' },
 77:             { val: '0%',                   label: 'EMI Interest'  },
 78:             { val: '24/7',                 label: 'Expert Support' },
 79:           ].map((s) => (
 80:             <div key={s.label} className="text-center">
 81:               <p className="text-3xl font-black text-brand-orange">{s.val}</p>
 82:               <p className="text-white/60 text-xs font-medium mt-1 uppercase tracking-wide">
 83:                 {s.label}
 84:               </p>
 85:             </div>
 86:           ))}
 87:         </div>
 88:       </div>
 89: 
 90:       {/* ── Wave Divider ── */}
 91:       <div className="absolute bottom-0 left-0 right-0 z-10">
 92:         <svg
 93:           viewBox="0 0 1440 60"
 94:           fill="none"
 95:           xmlns="http://www.w3.org/2000/svg"
 96:           className="w-full"
 97:           preserveAspectRatio="none"
 98:           aria-hidden="true"
 99:         >
100:           <path
101:             d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27.5C840 35 960 40 1080 37.5C1200 35 1320 25 1380 20L1440 15V60H0Z"
102:             fill="#FAFAFA"
103:           />
104:         </svg>
105:       </div>
106:     </section>
107:   );
108: }
````

## File: app/travel/page.js
````javascript
 1: /**
 2:  * app/travel/page.js
 3:  * ─────────────────────────────────────────────────────────────
 4:  * Travel Page — pure Server Component (SSR)
 5:  * Assembles all travel sections in order.
 6:  * All data fetched server-side from common/helper.js
 7:  *
 8:  * Section components:
 9:  *   - TravelHero       → Hero + breadcrumb + stats
10:  *   - TravelGrid       → Category filter + destination cards grid
11:  *   - TravelExpertCTA  → "Talk to expert" dark blue CTA
12:  * ─────────────────────────────────────────────────────────────
13:  */
14: 
15: import Navbar          from '@/app/components/Navbar';
16: import Footer          from '@/app/components/Footer';
17: import TravelHero      from '@/app/travel/components/TravelHero';
18: import TravelGrid      from '@/app/travel/components/TravelGrid';
19: import TravelExpertCTA from '@/app/travel/components/TravelExpertCTA';
20: 
21: import {
22:   getTravelDestinations,
23:   getTravelCategories,
24: } from '@/common/helper';
25: 
26: // ── SEO Metadata ──────────────────────────────────────────────
27: export const metadata = {
28:   title: 'Travel Destinations — Travel • Trek • Ride',
29:   description:
30:     'Explore handpicked travel destinations across India & beyond. Manali, Kashmir, Goa, Kerala, ' +
31:     'Andaman, Ladakh and more — with EMI options, expert guides, and community support.',
32:   keywords:
33:     'travel packages india, manali trip, kashmir tour, goa beach, kerala backwaters, ladakh, rishikesh',
34: };
35: 
36: // ── Page (async Server Component) ────────────────────────────
37: export default async function TravelPage() {
38:   // Server-side data — no API call, pure module import
39:   const destinations = getTravelDestinations();
40:   const categories   = getTravelCategories();
41: 
42:   return (
43:     <>
44:       {/* Shared sticky navbar */}
45:       <Navbar />
46: 
47:       <main className="min-h-screen">
48: 
49:         {/* 1. Hero — background image, heading, stats */}
50:         <TravelHero totalDestinations={destinations.length} />
51: 
52:         {/* 2. Destination Cards — category filter + responsive grid */}
53:         <TravelGrid
54:           destinations={destinations}
55:           categories={categories}
56:         />
57: 
58:         {/* 3. Expert CTA — "Not sure where to go?" */}
59:         <TravelExpertCTA />
60: 
61:       </main>
62: 
63:       {/* Shared footer */}
64:       <Footer />
65:     </>
66:   );
67: }
````

## File: app/trek/[slug]/booking/page.js
````javascript
 1: /**
 2:  * app/trek/[slug]/booking/page.js
 3:  * Booking Page — Server Component (SSR)
 4:  * Route: /trek/[slug]/booking
 5:  */
 6: 
 7: import Link from 'next/link';
 8: import { notFound } from 'next/navigation';
 9: import Navbar from '@/app/components/Navbar';
10: import Footer from '@/app/components/Footer';
11: import { getTrekBySlug } from '@/common/helper';
12: import BookingForm from '@/common/components/BookingForm';
13: 
14: export async function generateMetadata({ params }) {
15:   const dest = getTrekBySlug(params.slug);
16:   if (!dest) return { title: 'Trek Not Found — Travel • Trek • Ride' };
17:   return {
18:     title: `Book ${dest.title} — Travel • Trek • Ride`,
19:     description: `Book ${dest.title} for ${dest.price}/person. Fill your details and pay via UPI instantly.`,
20:   };
21: }
22: 
23: export default async function TrekBookingPage({ params }) {
24:   const dest = getTrekBySlug(params.slug);
25:   if (!dest) notFound();
26: 
27:   return (
28:     <>
29:       <Navbar />
30:       <main className="min-h-screen bg-brand-light">
31: 
32:         {/* ── Page Header ──────────────────────────────────── */}
33:         <section className="relative overflow-hidden py-14
34:                             bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue">
35:           <div className="absolute inset-0 opacity-5 pointer-events-none"
36:                style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
37:           <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
38:             {/* Breadcrumb */}
39:             <nav className="flex items-center gap-2 text-white/50 text-sm font-medium mb-5">
40:               <Link href="/" className="hover:text-white transition-colors">Home</Link>
41:               <span>/</span>
42:               <Link href="/trek" className="hover:text-white transition-colors">Trek</Link>
43:               <span>/</span>
44:               <Link href={`/trek/${dest.slug}`}
45:                     className="hover:text-white transition-colors truncate">
46:                 {dest.title}
47:               </Link>
48:               <span>/</span>
49:               <span className="text-brand-orange font-bold">Book Now</span>
50:             </nav>
51: 
52:             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
53:               <div>
54:                 <span className="inline-block bg-orange-500/20 text-brand-orange text-xs font-bold
55:                                  px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
56:                   Secure Booking
57:                 </span>
58:                 <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
59:                   {dest.title}
60:                 </h1>
61:                 <p className="text-white/60 font-medium mt-1">
62:                   {dest.days} Days / {dest.nights} Nights · {dest.location}
63:                 </p>
64:               </div>
65:               <div className="text-right">
66:                 <p className="text-4xl font-black text-brand-orange">{dest.price}</p>
67:                 <p className="text-white/50 text-sm font-medium">per person</p>
68:               </div>
69:             </div>
70:           </div>
71:         </section>
72: 
73:         {/* ── Form + Summary ───────────────────────────────── */}
74:         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
75:           {/* Reuse the BookingForm identically! */}
76:           <BookingForm destination={dest} />
77:         </div>
78: 
79:       </main>
80:       <Footer />
81:     </>
82:   );
83: }
````

## File: app/trek/[slug]/components/FAQSection.js
````javascript
  1: "use client";
  2: /**
  3:  * app/travel/[slug]/components/FAQSection.js
  4:  * Accordion FAQ — uses react-animate-height for smooth animated open/close.
  5:  */
  6: 
  7: import { useState } from 'react';
  8: import AnimateHeight from 'react-animate-height';
  9: 
 10: function FAQItem({ faq, index }) {
 11:   const [open, setOpen] = useState(false);
 12: 
 13:   return (
 14:     <div
 15:       className={`border rounded-2xl overflow-hidden transition-all duration-300
 16:                   ${open ? 'border-brand-orange shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
 17:     >
 18:       {/* Question Button */}
 19:       <button
 20:         onClick={() => setOpen(!open)}
 21:         className="w-full flex items-center justify-between px-6 py-5 text-left
 22:                    hover:bg-orange-50 transition-colors duration-200 focus:outline-none
 23:                     focus:ring-inset focus:ring-brand-orange/30"
 24:         aria-expanded={open}
 25:         aria-controls={`faq-answer-${index}`}
 26:         id={`faq-btn-${index}`}
 27:       >
 28:         <span className="font-bold text-brand-black text-sm sm:text-base pr-6 leading-snug">
 29:           {faq.q}
 30:         </span>
 31: 
 32:         {/* Animated +/× icon */}
 33:         <span
 34:           className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center
 35:                       justify-center font-black text-lg leading-none
 36:                       transition-all duration-300
 37:                       ${open
 38:                         ? 'border-brand-orange text-brand-orange bg-orange-50 rotate-45'
 39:                         : 'border-gray-300 text-gray-400 bg-white'
 40:                       }`}
 41:           aria-hidden="true"
 42:         >
 43:           +
 44:         </span>
 45:       </button>
 46: 
 47:       {/* Animated Answer — smooth slide via react-animate-height */}
 48:       <AnimateHeight
 49:         id={`faq-answer-${index}`}
 50:         duration={320}
 51:         height={open ? 'auto' : 0}
 52:         easing="ease-in-out"
 53:       >
 54:         <div className="px-6 pb-6 pt-2 border-t border-gray-100">
 55:           <p className="text-brand-gray text-sm font-medium leading-relaxed">
 56:             {faq.a}
 57:           </p>
 58:         </div>
 59:       </AnimateHeight>
 60:     </div>
 61:   );
 62: }
 63: 
 64: export default function FAQSection({ faqs }) {
 65:   return (
 66:     <section
 67:       id="faq"
 68:       className="py-16 md:py-20 bg-white"
 69:       aria-labelledby="faq-heading"
 70:     >
 71:       <div className="max-w-3xl mx-auto px-4 sm:px-6">
 72: 
 73:         {/* Header */}
 74:         <div className="text-center mb-10">
 75:           <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
 76:                            px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
 77:             FAQs
 78:           </span>
 79:           <h2
 80:             id="faq-heading"
 81:             className="text-3xl md:text-4xl font-extrabold text-brand-black"
 82:           >
 83:             Frequently Asked Questions
 84:           </h2>
 85:           <p className="text-brand-gray font-medium mt-2 text-sm">
 86:             Still have questions?{' '}
 87:             <a href="/" className="text-brand-orange font-bold hover:underline">
 88:               Chat with our expert
 89:             </a>
 90:           </p>
 91:         </div>
 92: 
 93:         {/* FAQ List */}
 94:         <div className="space-y-3">
 95:           {faqs.map((faq, i) => (
 96:             <FAQItem key={i} faq={faq} index={i} />
 97:           ))}
 98:         </div>
 99: 
100:       </div>
101:     </section>
102:   );
103: }
````

## File: app/trek/[slug]/components/TrekCTA.js
````javascript
 1: import Link from 'next/link';
 2: 
 3: export default function TrekCTA({ title, slug }) {
 4:   return (
 5:     <section id="final-cta"
 6:              className="py-20 bg-gradient-to-br from-brand-black via-gray-900 to-brand-blue
 7:                         relative overflow-hidden text-center">
 8:       <div className="absolute inset-0 opacity-5 pointer-events-none"
 9:            style={{ backgroundImage: 'radial-gradient(circle, #FF6B00 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
10:       <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
11:         <span className="text-5xl block mb-6">🏔️</span>
12:         <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
13:           Ready to Conquer{' '}
14:           <span className="text-gradient-orange">{title.split(' ')[0]}?</span>
15:         </h2>
16:         <p className="text-white/70 font-medium text-lg mb-10">
17:           Only limited batch sizes allowed for safety. Reserve yours today!
18:         </p>
19:         <div className="flex flex-col sm:flex-row gap-4 justify-center">
20:           <Link href="/trek"
21:                 className="inline-flex items-center justify-center gap-2
22:                            border-2 border-white/40 text-white font-bold text-base
23:                            px-7 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
24:             ← Back to All Treks
25:           </Link>
26:           <Link href={`/trek/${slug}/booking`}
27:                 id="reserve-seat-btn"
28:                 className="inline-flex items-center justify-center gap-2
29:                            bg-brand-orange text-white font-black text-base
30:                            px-8 py-4 rounded-full shadow-orange-glow
31:                            transition-all duration-300
32:                            hover:bg-brand-orange-hover hover:scale-105 hover:shadow-xl">
33:             🎒 Reserve Your Seat
34:           </Link>
35:         </div>
36:       </div>
37:     </section>
38:   );
39: }
````

## File: app/trek/[slug]/components/TrekGallery.js
````javascript
 1: export default function TrekGallery({ galleryImages, title }) {
 2:   if (!galleryImages || galleryImages.length === 0) return null;
 3: 
 4:   return (
 5:     <section id="gallery" className="py-16 bg-brand-light" aria-labelledby="gallery-heading">
 6:       <div className="max-w-6xl mx-auto px-4 sm:px-6">
 7:         <div className="text-center mb-8">
 8:           <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
 9:                            px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">Gallery</span>
10:           <h2 id="gallery-heading" className="text-3xl font-extrabold text-brand-black">
11:             Trek Views
12:           </h2>
13:         </div>
14:         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
15:           {galleryImages.map((src, i) => (
16:             <div key={i}
17:                  className="aspect-square overflow-hidden rounded-2xl shadow-sm
18:                             hover:shadow-card-hover hover:scale-[1.02]
19:                             transition-all duration-300">
20:               <img src={src} alt={`${title} gallery photo ${i + 1}`}
21:                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
22:                    loading="lazy" />
23:             </div>
24:           ))}
25:         </div>
26:       </div>
27:     </section>
28:   );
29: }
````

## File: app/trek/[slug]/components/TrekHero.js
````javascript
 1: import Link from 'next/link';
 2: 
 3: const diffStyle = {
 4:   Easy: 'bg-green-100 text-green-700',
 5:   Moderate: 'bg-yellow-100 text-yellow-700',
 6:   Hard: 'bg-red-100 text-red-700',
 7: };
 8: 
 9: export default function TrekHero({ trek }) {
10:   const { title, location, image, price, days, nights, rating, reviews, difficulty, category, badge, badgeColor } = trek;
11: 
12:   return (
13:     <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
14:       <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
15:       <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-brand-black/20" />
16: 
17:       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
18:         <nav className="flex items-center gap-2 text-white/60 text-sm font-medium mb-4">
19:           <Link href="/" className="hover:text-white transition-colors">Home</Link>
20:           <span>/</span>
21:           <Link href="/trek" className="hover:text-white transition-colors">Trek</Link>
22:           <span>/</span>
23:           <span className="text-brand-orange font-bold truncate">{title}</span>
24:         </nav>
25: 
26:         <div className="flex flex-wrap gap-2 mb-4">
27:           <span className={`${badgeColor || 'bg-brand-orange'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
28:             {badge}
29:           </span>
30:           <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
31:             {Array.isArray(category) ? category[0] : category}
32:           </span>
33:           <span className={`text-xs font-bold px-3 py-1 rounded-full ${diffStyle[difficulty] || diffStyle.Moderate}`}>
34:             {difficulty}
35:           </span>
36:         </div>
37: 
38:         <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 max-w-3xl">
39:           {title}
40:         </h1>
41: 
42:         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
43:           <span className="flex items-center gap-1">
44:             <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
45:               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
46:             </svg>
47:             {location}
48:           </span>
49:           <span className="flex items-center gap-1">
50:             <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
51:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
52:             </svg>
53:             {days}D / {nights}N
54:           </span>
55:           <span className="flex items-center gap-1 text-amber-400">
56:             ★ {rating} <span className="text-white/50 ml-1">({reviews} reviews)</span>
57:           </span>
58:           <span className="text-2xl font-black text-brand-orange ml-auto">
59:             {price} <span className="text-sm font-medium text-white/50">/ person</span>
60:           </span>
61:         </div>
62:       </div>
63:     </section>
64:   );
65: }
````

## File: app/trek/[slug]/components/TrekMainContent.js
````javascript
  1: import { SafetyIcon, HighlightIcon, CheckCircleIcon, XCircleIcon } from '@/common/icons';
  2: 
  3: export default function TrekMainContent({ trek }) {
  4:   const { description, safetyNote, highlights, itinerary, inclusions, exclusions } = trek;
  5: 
  6:   return (
  7:     <div className="flex-1 min-w-0 space-y-10">
  8:       
  9:       {/* About This Trek */}
 10:       <section id="about" aria-labelledby="about-heading">
 11:         <h2 id="about-heading" className="text-2xl font-extrabold text-brand-black mb-4 flex items-center gap-2">
 12:           <span className="w-1 h-7 bg-brand-orange rounded-full block" />
 13:           About This Trek
 14:         </h2>
 15:         <p className="text-brand-gray font-medium leading-relaxed text-base">
 16:           {description}
 17:         </p>
 18:       </section>
 19: 
 20:       {/* Safety Information Note */}
 21:       {safetyNote && (
 22:         <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-4 my-6">
 23:           <h3 className="font-extrabold text-red-800 text-sm flex items-center gap-2 mb-1">
 24:             <SafetyIcon />
 25:             Safety Guarantee
 26:           </h3>
 27:           <p className="text-sm text-red-700 font-medium ml-7">{safetyNote}</p>
 28:         </div>
 29:       )}
 30: 
 31:       {/* Highlights */}
 32:       <section id="highlights" aria-labelledby="highlights-heading">
 33:         <h2 id="highlights-heading" className="text-2xl font-extrabold text-brand-black mb-5 flex items-center gap-2">
 34:           <span className="w-1 h-7 bg-brand-orange rounded-full block" />
 35:           Trek Highlights
 36:         </h2>
 37:         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 38:           {highlights.map((h) => (
 39:             <div key={h} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 hover:border-brand-orange/30 hover:shadow-md transition-all duration-200">
 40:               <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
 41:                 <HighlightIcon />
 42:               </span>
 43:               <span className="text-brand-black font-semibold text-sm">{h}</span>
 44:             </div>
 45:           ))}
 46:         </div>
 47:       </section>
 48: 
 49:       {/* Itinerary */}
 50:       <section id="itinerary" aria-labelledby="itinerary-heading">
 51:         <h2 id="itinerary-heading" className="text-2xl font-extrabold text-brand-black mb-6 flex items-center gap-2">
 52:           <span className="w-1 h-7 bg-brand-orange rounded-full block" />
 53:           Day-by-Day Itinerary
 54:         </h2>
 55:         <div className="space-y-4">
 56:           {itinerary.map((day) => (
 57:             <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-brand-orange/20 transition-all duration-200">
 58:               <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-100">
 59:                 <span className="w-12 h-12 rounded-2xl bg-brand-orange text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-orange-glow">
 60:                   D{day.day}
 61:                 </span>
 62:                 <div>
 63:                   <p className="text-xs text-brand-orange font-bold uppercase tracking-wide">Day {day.day}</p>
 64:                   <h3 className="text-brand-black font-extrabold text-base">{day.title}</h3>
 65:                 </div>
 66:               </div>
 67:               <ul className="p-5 space-y-2">
 68:                 {day.activities.map((act, j) => (
 69:                   <li key={j} className="flex items-start gap-2.5 text-sm text-brand-gray font-medium">
 70:                     <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
 71:                     {act}
 72:                   </li>
 73:                 ))}
 74:               </ul>
 75:             </div>
 76:           ))}
 77:         </div>
 78:       </section>
 79: 
 80:       {/* Inclusions & Exclusions */}
 81:       <section id="inclusions" aria-labelledby="incl-heading">
 82:         <h2 id="incl-heading" className="text-2xl font-extrabold text-brand-black mb-5 flex items-center gap-2">
 83:           <span className="w-1 h-7 bg-brand-orange rounded-full block" />
 84:           Inclusions &amp; Exclusions
 85:         </h2>
 86:         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 87:           {/* Inclusions */}
 88:           <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
 89:             <h3 className="font-extrabold text-green-700 mb-4 flex items-center gap-2">
 90:               <CheckCircleIcon /> What&apos;s Included
 91:             </h3>
 92:             <ul className="space-y-2">
 93:               {(inclusions || []).map((inc) => (
 94:                 <li key={inc} className="flex items-start gap-2 text-sm text-green-800 font-medium">
 95:                   <CheckCircleIcon /> {inc}
 96:                 </li>
 97:               ))}
 98:             </ul>
 99:           </div>
100:           {/* Exclusions */}
101:           <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
102:             <h3 className="font-extrabold text-red-700 mb-4 flex items-center gap-2">
103:               <XCircleIcon /> Not Included
104:             </h3>
105:             <ul className="space-y-2">
106:               {(exclusions || []).map((ex) => (
107:                 <li key={ex} className="flex items-start gap-2 text-sm text-red-800 font-medium">
108:                   <XCircleIcon /> {ex}
109:                 </li>
110:               ))}
111:             </ul>
112:           </div>
113:         </div>
114:       </section>
115: 
116:     </div>
117:   );
118: }
````

## File: app/trek/[slug]/components/TrekWhyUs.js
````javascript
 1: export default function TrekWhyUs() {
 2:   return (
 3:     <section id="why-us" className="py-16 bg-white" aria-labelledby="why-heading">
 4:       <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
 5:         <span className="inline-block bg-blue-50 text-brand-blue text-sm font-bold
 6:                          px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
 7:           Trust & Safety
 8:         </span>
 9:         <h2 id="why-heading" className="text-3xl font-extrabold text-brand-black mb-10">
10:           Why Trek With Travel • Trek • Ride?
11:         </h2>
12:         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
13:           {[
14:             { emoji: '🧗‍♂️', title: 'Expert Local Guides', desc: 'Certified mountain guides who know the terrain, culture, and weather patterns inside out.' },
15:             { emoji: '🚑', title: 'Safety First', desc: 'Fully equipped with medical kits, oxygen cylinders, and strict acclimatization protocols.' },
16:             { emoji: '♻️', title: 'Eco-Friendly Treks', desc: 'Zero-trace policy. We respect the mountains and ensure our treks are fully sustainable.' },
17:           ].map((card) => (
18:             <div key={card.title}
19:                  className="bg-brand-light rounded-3xl p-7 text-center border border-gray-100
20:                             hover:shadow-card hover:border-brand-orange/20 hover:scale-[1.03]
21:                             transition-all duration-300">
22:               <span className="text-5xl block mb-4">{card.emoji}</span>
23:               <h3 className="text-brand-black font-extrabold text-lg mb-2">{card.title}</h3>
24:               <p className="text-brand-gray text-sm font-medium leading-relaxed">{card.desc}</p>
25:             </div>
26:           ))}
27:         </div>
28:       </div>
29:     </section>
30:   );
31: }
````

## File: app/trek/[slug]/page.js
````javascript
 1: /**
 2:  * app/trek/[slug]/page.js
 3:  * Dynamic Trek Details Page — Server Component (SSR)
 4:  * Route: /trek/[slug]
 5:  */
 6: 
 7: import { notFound } from 'next/navigation';
 8: import Navbar from '@/app/components/Navbar';
 9: import Footer from '@/app/components/Footer';
10: 
11: // Reusable components
12: import BookingCard from '@/common/components/BookingCard';
13: import FAQSection  from '@/common/components/FAQSection';
14: import TrekHero from './components/TrekHero';
15: import TrekMainContent from './components/TrekMainContent';
16: import TrekWhyUs from './components/TrekWhyUs';
17: import TrekGallery from './components/TrekGallery';
18: import TrekCTA from './components/TrekCTA';
19: 
20: import { getAllTreks, getTrekBySlug } from '@/common/helper';
21: 
22: export async function generateStaticParams() {
23:   return getAllTreks().map((t) => ({ slug: t.slug }));
24: }
25: 
26: export async function generateMetadata({ params }) {
27:   const trek = getTrekBySlug(params.slug);
28:   if (!trek) return { title: 'Trek Not Found — Travel • Trek • Ride' };
29:   return {
30:     title: `${trek.title} — ${trek.price} | Travel • Trek • Ride`,
31:     description: trek.description.slice(0, 155),
32:   };
33: }
34: 
35: export default async function TrekDetailsPage({ params }) {
36:   const trek = getTrekBySlug(params.slug);
37:   if (!trek) notFound();
38: 
39:   return (
40:     <>
41:       <Navbar />
42:       <main className="min-h-screen bg-brand-light">
43: 
44:         {/* 1. HERO SECTION */}
45:         <TrekHero trek={trek} />
46: 
47:         {/* 2. MAIN CONTENT — Two Column Layout */}
48:         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
49:           <div className="flex flex-col lg:flex-row gap-8">
50:             
51:             {/* ────── LEFT COLUMN (70%) ────── */}
52:             <TrekMainContent trek={trek} />
53: 
54:             {/* ────── RIGHT COLUMN — Booking Card (30%) ────── */}
55:             <aside className="lg:w-80 xl:w-96 flex-shrink-0">
56:               <BookingCard
57:                 price={trek.price}
58:                 originalPrice={trek.originalPrice}
59:                 days={trek.days}
60:                 nights={trek.nights}
61:                 title={trek.title}
62:                 slug={trek.slug}
63:               />
64:             </aside>
65: 
66:           </div>
67:         </div>
68: 
69:         {/* 3. WHY TREK WITH US */}
70:         <TrekWhyUs />
71: 
72:         {/* 4. PHOTO GALLERY */}
73:         <TrekGallery galleryImages={trek.galleryImages} title={trek.title} />
74: 
75:         {/* 5. FAQ */}
76:         <FAQSection faqs={trek.faqs} />
77: 
78:         {/* 6. FINAL CTA */}
79:         <TrekCTA title={trek.title} slug={trek.slug} />
80: 
81:       </main>
82:       <Footer />
83:     </>
84:   );
85: }
````

## File: app/trek/components/TravelExpertCTA.js
````javascript
  1: /**
  2:  * app/travel/components/TravelExpertCTA.js
  3:  * ─────────────────────────────────────────────────────────────
  4:  * Travel Page — "Talk to a Travel Expert" CTA Section (Server Component)
  5:  * Full-width dark blue section with Chat & Call buttons at page bottom.
  6:  * ─────────────────────────────────────────────────────────────
  7:  */
  8: 
  9: import Link from 'next/link';
 10: 
 11: export default function TravelExpertCTA() {
 12:   return (
 13:     <section
 14:       id="travel-expert"
 15:       className="py-20 md:py-28 bg-gradient-to-br
 16:                  from-brand-blue via-brand-blue-dark to-blue-950
 17:                  relative overflow-hidden"
 18:       aria-labelledby="expert-heading"
 19:     >
 20:       {/* ── Decorative Circles ── */}
 21:       <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full
 22:                       -translate-y-1/3 translate-x-1/3 pointer-events-none" />
 23:       <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full
 24:                       translate-y-1/3 -translate-x-1/3 pointer-events-none" />
 25: 
 26:       {/* ── Dot Grid Background ── */}
 27:       <div
 28:         className="absolute inset-0 opacity-5 pointer-events-none"
 29:         aria-hidden="true"
 30:         style={{
 31:           backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
 32:           backgroundSize: '28px 28px',
 33:         }}
 34:       />
 35: 
 36:       {/* ── Content ── */}
 37:       <div className="relative text-center max-w-3xl mx-auto px-4 sm:px-6">
 38: 
 39:         {/* Icon */}
 40:         <div className="inline-flex items-center justify-center w-20 h-20
 41:                         bg-white/10 backdrop-blur-sm rounded-2xl mb-8
 42:                         border border-white/20">
 43:           <svg className="w-10 h-10 text-brand-orange" fill="none"
 44:                stroke="currentColor" viewBox="0 0 24 24">
 45:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
 46:                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8
 47:                      a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042
 48:                      3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
 49:           </svg>
 50:         </div>
 51: 
 52:         {/* Heading */}
 53:         <h2
 54:           id="expert-heading"
 55:           className="text-3xl sm:text-4xl md:text-5xl font-black text-white
 56:                      leading-tight mb-4"
 57:         >
 58:           Not sure where to go?
 59:         </h2>
 60: 
 61:         {/* Body text */}
 62:         <p className="text-xl text-white/80 font-medium max-w-xl mx-auto mb-3">
 63:           Talk to our travel expert — we&apos;ll plan the perfect trip just for you.
 64:         </p>
 65:         <p className="text-white/50 text-sm font-medium mb-12">
 66:           Free consultation &nbsp;•&nbsp; 24/7 support &nbsp;•&nbsp; Customized itineraries
 67:         </p>
 68: 
 69:         {/* Perks row */}
 70:         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
 71:           {[
 72:             { icon: '💬', label: 'Free Consultation', val: 'No Cost' },
 73:             { icon: '🗺️', label: 'Custom Itinerary',  val: 'Built for You' },
 74:             { icon: '⏰', label: '24/7 Support',      val: 'Always Available' },
 75:           ].map((p) => (
 76:             <div key={p.label}
 77:                  className="bg-white/5 backdrop-blur-sm border border-white/10
 78:                             rounded-2xl py-4 px-3 text-center">
 79:               <span className="text-2xl block mb-1">{p.icon}</span>
 80:               <p className="text-brand-orange font-black text-sm">{p.val}</p>
 81:               <p className="text-white/50 text-xs font-medium mt-0.5">{p.label}</p>
 82:             </div>
 83:           ))}
 84:         </div>
 85: 
 86:         {/* CTA Buttons */}
 87:         <div className="flex flex-col sm:flex-row gap-4 justify-center">
 88:           <Link
 89:             href="/"
 90:             id="expert-chat-btn"
 91:             className="inline-flex items-center justify-center gap-2
 92:                        bg-brand-orange text-white font-bold text-base
 93:                        px-8 py-4 rounded-full shadow-orange-glow
 94:                        transition-all duration-300
 95:                        hover:bg-brand-orange-hover hover:scale-105 hover:shadow-xl
 96:                        active:scale-95"
 97:           >
 98:             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 99:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
100:                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8
101:                        a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042
102:                        3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
103:             </svg>
104:             Chat with Expert
105:           </Link>
106: 
107:           <Link
108:             href="tel:+918800000000"
109:             id="expert-call-btn"
110:             className="inline-flex items-center justify-center gap-2
111:                        border-2 border-white text-white font-bold text-base
112:                        px-8 py-4 rounded-full
113:                        transition-all duration-300
114:                        hover:bg-white hover:text-brand-blue hover:scale-105
115:                        active:scale-95"
116:           >
117:             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
118:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
119:                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0
120:                        01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1
121:                        1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1
122:                        C9.716 21 3 14.284 3 6V5z" />
123:             </svg>
124:             Call Now
125:           </Link>
126:         </div>
127:       </div>
128:     </section>
129:   );
130: }
````

## File: app/trek/components/TravelGrid.js
````javascript
  1: 'use client';
  2: 
  3: /**
  4:  * app/travel/components/TravelGrid.js
  5:  * ─────────────────────────────────────────────────────────────
  6:  * Travel Page — Destination Cards Grid
  7:  * 'use client' — category filter buttons use useState for live filtering.
  8:  * Data (destinations + categories) is passed as props from SSR page.js.
  9:  * ─────────────────────────────────────────────────────────────
 10:  */
 11: 
 12: import { useState, useMemo } from 'react';
 13: import Link from 'next/link';
 14: 
 15: // ── Difficulty badge colors ───────────────────────────────────
 16: const difficultyStyle = {
 17:   Easy:     'bg-green-100 text-green-700',
 18:   Moderate: 'bg-yellow-100 text-yellow-700',
 19:   Hard:     'bg-red-100   text-red-700',
 20: };
 21: 
 22: // ── Star Rating ───────────────────────────────────────────────
 23: function StarRating({ rating, reviews }) {
 24:   const full  = Math.floor(rating);
 25:   const half  = rating % 1 >= 0.5;
 26:   const empty = 5 - full - (half ? 1 : 0);
 27: 
 28:   return (
 29:     <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5`}>
 30:       <span className="text-amber-400 text-sm tracking-tighter">
 31:         {'★'.repeat(full)}
 32:         {half ? '⯨' : ''}
 33:         <span className="text-gray-300">{'★'.repeat(empty)}</span>
 34:       </span>
 35:       <span className="text-xs text-brand-gray font-medium">
 36:         {rating} ({reviews})
 37:       </span>
 38:     </div>
 39:   );
 40: }
 41: 
 42: // ── Single Destination Card ───────────────────────────────────
 43: function DestinationCard({ destination }) {
 44:   const {
 45:     slug, title, location, image, price, originalPrice,
 46:     days, nights, highlights, badge, badgeColor,
 47:     rating, reviews, category, difficulty, includes,
 48:   } = destination;
 49: 
 50:   return (
 51:     <article
 52:       className="group bg-white rounded-3xl overflow-hidden shadow-card
 53:                  hover:shadow-card-hover hover:scale-[1.03]
 54:                  transition-all duration-300 flex flex-col h-full"
 55:       aria-label={`${title} — ${price}`}
 56:     >
 57:       {/* Image */}
 58:       <div className="relative h-52 overflow-hidden flex-shrink-0">
 59:         <img
 60:           src={image}
 61:           alt={`${title} — ${location}`}
 62:           className="w-full h-full object-cover transition-transform
 63:                      duration-700 group-hover:scale-110"
 64:           loading="lazy"
 65:         />
 66:         {/* Badge */}
 67:         <span className={`absolute top-3 left-3 ${badgeColor} text-white
 68:                           text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
 69:           {badge}
 70:         </span>
 71:         {/* Category */}
 72:         <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm
 73:                          text-brand-black text-xs font-bold px-2.5 py-1 rounded-full">
 74:           {category}
 75:         </span>
 76:         {/* Duration */}
 77:         <span className="absolute bottom-3 left-3 flex items-center gap-1.5
 78:                          bg-black/60 backdrop-blur-sm text-white
 79:                          text-xs font-semibold px-3 py-1.5 rounded-full">
 80:           <svg className="w-3.5 h-3.5 text-brand-orange"
 81:                fill="none" stroke="currentColor" viewBox="0 0 24 24">
 82:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 83:                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 84:           </svg>
 85:           {days}D / {nights}N
 86:         </span>
 87:         {/* Bottom gradient */}
 88:         <div className="absolute bottom-0 inset-x-0 h-16
 89:                         bg-gradient-to-t from-black/50 to-transparent" />
 90:       </div>
 91: 
 92:       {/* Body */}
 93:       <div className="flex flex-col flex-1 p-5">
 94:         {/* Location */}
 95:         <div className="flex items-center gap-1 text-brand-gray text-xs font-medium mb-1.5">
 96:           <svg className="w-3.5 h-3.5 text-brand-orange flex-shrink-0"
 97:                fill="currentColor" viewBox="0 0 20 20">
 98:             <path fillRule="evenodd"
 99:                   d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
100:                   clipRule="evenodd" />
101:           </svg>
102:           <span className="truncate">{location}</span>
103:         </div>
104: 
105:         {/* Title */}
106:         <h2 className="text-lg font-extrabold text-brand-black leading-snug mb-2
107:                        group-hover:text-brand-blue transition-colors duration-300">
108:           {title}
109:         </h2>
110: 
111:         {/* Rating */}
112:         <StarRating rating={rating} reviews={reviews} />
113: 
114:         {/* Difficulty */}
115:         <span className={`mt-2 inline-block text-xs font-bold px-2.5 py-0.5
116:                           rounded-full w-fit ${difficultyStyle[difficulty]}`}>
117:           {difficulty}
118:         </span>
119: 
120:         {/* Highlights */}
121:         <ul className="mt-3 space-y-1 flex-1" aria-label="Trip highlights">
122:           {highlights.slice(0, 3).map((h) => (
123:             <li key={h} className="flex items-start gap-2 text-xs text-brand-gray font-medium">
124:               <svg className="w-3.5 h-3.5 text-brand-orange mt-0.5 flex-shrink-0"
125:                    fill="currentColor" viewBox="0 0 20 20">
126:                 <path fillRule="evenodd"
127:                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
128:                       clipRule="evenodd" />
129:               </svg>
130:               {h}
131:             </li>
132:           ))}
133:         </ul>
134: 
135:         {/* Includes tags */}
136:         <div className="flex flex-wrap gap-1.5 mt-3">
137:           {includes.slice(0, 3).map((inc) => (
138:             <span key={inc}
139:                   className="bg-blue-50 text-brand-blue text-xs font-semibold
140:                              px-2 py-0.5 rounded-lg">
141:               {inc}
142:             </span>
143:           ))}
144:         </div>
145: 
146:         {/* Price + CTA */}
147:         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
148:           <div>
149:             <p className="text-2xl font-black text-brand-orange leading-none">{price}</p>
150:             <p className="text-xs text-brand-gray line-through mt-0.5">{originalPrice}</p>
151:             <p className="text-xs text-green-600 font-semibold">per person</p>
152:           </div>
153:           <Link
154:             href={`/travel/${slug}`}
155:             id={`view-details-${slug}`}
156:             className="inline-flex items-center gap-1.5
157:                        bg-brand-orange text-white font-bold text-sm
158:                        px-4 py-2.5 rounded-full shadow-orange-glow
159:                        transition-all duration-300
160:                        hover:bg-brand-orange-hover hover:scale-105
161:                        active:scale-95"
162:             aria-label={`View details for ${title}`}
163:           >
164:             View Details
165:             <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
166:                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
167:               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
168:                     d="M13 7l5 5m0 0l-5 5m5-5H6" />
169:             </svg>
170:           </Link>
171:         </div>
172:       </div>
173:     </article>
174:   );
175: }
176: 
177: // ── Empty State ───────────────────────────────────────────────
178: function EmptyState({ category }) {
179:   return (
180:     <div className="col-span-full flex flex-col items-center justify-center
181:                     py-24 text-center">
182:       <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center
183:                       justify-center text-4xl mb-5">
184:         🗺️
185:       </div>
186:       <h3 className="text-xl font-extrabold text-brand-black mb-2">
187:         No packages found for &quot;{category}&quot;
188:       </h3>
189:       <p className="text-brand-gray font-medium text-sm max-w-xs">
190:         We&apos;re adding more destinations soon. Try a different category!
191:       </p>
192:     </div>
193:   );
194: }
195: 
196: // ── Main Component ────────────────────────────────────────────
197: export default function TravelGrid({ destinations, categories }) {
198:   // Active category state — default "All"
199:   const [activeCategory, setActiveCategory] = useState('All');
200: 
201:   // Filtered destinations — recomputed only when activeCategory changes
202:   const filtered = useMemo(() => {
203:     if (activeCategory === 'All') return destinations;
204:     return destinations.filter((d) => d.category === activeCategory);
205:   }, [activeCategory, destinations]);
206: 
207:   return (
208:     <section
209:       id="all-packages"
210:       className="py-16 md:py-24 bg-brand-light"
211:       aria-labelledby="packages-heading"
212:     >
213:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
214: 
215:         {/* ── Section Header ── */}
216:         <div className="text-center mb-10">
217:           <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
218:                            px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
219:             All Packages
220:           </span>
221:           <h2
222:             id="packages-heading"
223:             className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black mb-3"
224:           >
225:             All Travel Packages
226:           </h2>
227:           <p className="text-brand-gray font-medium text-lg max-w-xl mx-auto">
228:             Every journey starts with a single step. Pick yours.
229:           </p>
230:         </div>
231: 
232:         {/* ── Category Filter Buttons ── */}
233:         <div
234:           className="flex flex-wrap gap-2 justify-center mb-12"
235:           role="tablist"
236:           aria-label="Filter destinations by category"
237:         >
238:           {categories.map((cat) => {
239:             const isActive = activeCategory === cat;
240:             return (
241:               <button
242:                 key={cat}
243:                 id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
244:                 role="tab"
245:                 aria-selected={isActive}
246:                 onClick={() => setActiveCategory(cat)}
247:                 className={`px-5 py-2 rounded-full text-sm font-bold border-2
248:                             transition-all duration-200 cursor-pointer
249:                             focus:outline-none focus:ring-2 focus:ring-brand-orange/50
250:                             hover:scale-105 active:scale-95
251:                             ${isActive
252:                               ? 'bg-brand-orange border-brand-orange text-white shadow-orange-glow scale-105'
253:                               : 'border-gray-200 text-brand-gray bg-white hover:border-brand-orange hover:text-brand-orange'
254:                             }`}
255:               >
256:                 {cat}
257:                 {/* Show count per category */}
258:                 <span className={`ml-1.5 text-xs font-semibold
259:                                   ${isActive ? 'text-white/80' : 'text-brand-gray/60'}`}>
260:                   ({cat === 'All'
261:                     ? destinations.length
262:                     : destinations.filter((d) => d.category === cat).length})
263:                 </span>
264:               </button>
265:             );
266:           })}
267:         </div>
268: 
269:         {/* ── Filtered Result Label ── */}
270:         <div className="flex items-center justify-between mb-6 px-1">
271:           <p className="text-brand-gray text-sm font-medium">
272:             Showing{' '}
273:             <span className="font-extrabold text-brand-black">{filtered.length}</span>{' '}
274:             {activeCategory === 'All' ? 'destinations' : `"${activeCategory}" packages`}
275:           </p>
276:           {/* Clear filter — shown only when a category is active */}
277:           {activeCategory !== 'All' && (
278:             <button
279:               onClick={() => setActiveCategory('All')}
280:               className="text-xs text-brand-orange font-bold hover:underline
281:                          flex items-center gap-1 transition-opacity"
282:               aria-label="Clear filter"
283:             >
284:               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
285:                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
286:                       d="M6 18L18 6M6 6l12 12" />
287:               </svg>
288:               Clear filter
289:             </button>
290:           )}
291:         </div>
292: 
293:         {/* ── Cards Grid ── */}
294:         <div
295:           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
296:           role="tabpanel"
297:           aria-live="polite"
298:           aria-label={`${activeCategory} destination packages`}
299:         >
300:           {filtered.length > 0
301:             ? filtered.map((destination) => (
302:                 <DestinationCard key={destination.id} destination={destination} />
303:               ))
304:             : <EmptyState category={activeCategory} />
305:           }
306:         </div>
307:       </div>
308:     </section>
309:   );
310: }
````

## File: app/trek/components/TravelHero.js
````javascript
  1: /**
  2:  * app/travel/components/TravelHero.js
  3:  * ─────────────────────────────────────────────────────────────
  4:  * Travel Page — Hero Section (Server Component)
  5:  * Full-viewport header with background image, heading, breadcrumb & stats.
  6:  * ─────────────────────────────────────────────────────────────
  7:  */
  8: 
  9: import Link from 'next/link';
 10: 
 11: export default function TravelHero({ totalDestinations = 10 }) {
 12:   return (
 13:     <section
 14:       className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
 15:       aria-label="Travel page hero"
 16:     >
 17:       {/* ── Background Image ── */}
 18:       <div className="absolute inset-0 z-0">
 19:         <img
 20:           src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80&auto=format&fit=crop"
 21:           alt="World travel destinations collage with map and camera"
 22:           className="w-full h-full object-cover object-center"
 23:           loading="eager"
 24:           fetchPriority="high"
 25:         />
 26:         {/* Dark overlay */}
 27:         <div className="absolute inset-0 bg-gradient-to-b
 28:                         from-brand-black/60 via-brand-black/55 to-brand-black/75" />
 29:         {/* Blue tint */}
 30:         <div className="absolute inset-0 bg-brand-blue/20" />
 31:       </div>
 32: 
 33:       {/* ── Hero Content ── */}
 34:       <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-28 pb-20">
 35: 
 36:         {/* Breadcrumb */}
 37:         <nav
 38:           className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium mb-6"
 39:           aria-label="Breadcrumb"
 40:         >
 41:           <Link href="/" className="hover:text-white transition-colors duration-200">
 42:             Home
 43:           </Link>
 44:           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 45:             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 46:           </svg>
 47:           <span className="text-brand-orange font-bold">Travel</span>
 48:         </nav>
 49: 
 50:         {/* Live badge */}
 51:         <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
 52:                         border border-white/20 text-white text-sm font-semibold
 53:                         px-4 py-2 rounded-full mb-6">
 54:           <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
 55:           {totalDestinations} Handpicked Destinations
 56:         </div>
 57: 
 58:         {/* Main Heading */}
 59:         <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white
 60:                        leading-tight tracking-tight mb-5">
 61:           Discover Amazing{' '}
 62:           <span className="text-gradient-orange">Travel</span>{' '}
 63:           Destinations
 64:         </h1>
 65: 
 66:         {/* Sub Heading */}
 67:         <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10">
 68:           Handpicked trips across India &amp; abroad &nbsp;•&nbsp;
 69:           <span className="text-brand-orange font-semibold">Explore. Earn. Experience.</span>
 70:         </p>
 71: 
 72:         {/* Quick Stats */}
 73:         <div className="flex flex-wrap justify-center gap-10">
 74:           {[
 75:             { val: `${totalDestinations}+`, label: 'Destinations' },
 76:             { val: '₹6,499',               label: 'Starting From' },
 77:             { val: '0%',                   label: 'EMI Interest'  },
 78:             { val: '24/7',                 label: 'Expert Support' },
 79:           ].map((s) => (
 80:             <div key={s.label} className="text-center">
 81:               <p className="text-3xl font-black text-brand-orange">{s.val}</p>
 82:               <p className="text-white/60 text-xs font-medium mt-1 uppercase tracking-wide">
 83:                 {s.label}
 84:               </p>
 85:             </div>
 86:           ))}
 87:         </div>
 88:       </div>
 89: 
 90:       {/* ── Wave Divider ── */}
 91:       <div className="absolute bottom-0 left-0 right-0 z-10">
 92:         <svg
 93:           viewBox="0 0 1440 60"
 94:           fill="none"
 95:           xmlns="http://www.w3.org/2000/svg"
 96:           className="w-full"
 97:           preserveAspectRatio="none"
 98:           aria-hidden="true"
 99:         >
100:           <path
101:             d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27.5C840 35 960 40 1080 37.5C1200 35 1320 25 1380 20L1440 15V60H0Z"
102:             fill="#FAFAFA"
103:           />
104:         </svg>
105:       </div>
106:     </section>
107:   );
108: }
````

## File: app/trek/components/TrekGridIndex.js
````javascript
  1: import Link from 'next/link';
  2: 
  3: const difficultyStyle = {
  4:   Easy:     'bg-green-100 text-green-700',
  5:   Moderate: 'bg-yellow-100 text-yellow-700',
  6:   Hard:     'bg-red-100   text-red-700',
  7: };
  8: 
  9: function StarRating({ rating, reviews }) {
 10:   const full  = Math.floor(rating);
 11:   const half  = rating % 1 >= 0.5;
 12:   const empty = 5 - full - (half ? 1 : 0);
 13: 
 14:   return (
 15:     <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5`}>
 16:       <span className="text-amber-400 text-sm tracking-tighter">
 17:         {'★'.repeat(full)}
 18:         {half ? '⯨' : ''}
 19:         <span className="text-gray-300">{'★'.repeat(empty)}</span>
 20:       </span>
 21:       <span className="text-xs text-brand-gray font-medium">
 22:         {rating} ({reviews})
 23:       </span>
 24:     </div>
 25:   );
 26: }
 27: 
 28: export default function TrekGrid({ treks }) {
 29:   return (
 30:     <section id="treks" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
 31:       <div className="text-center mb-12">
 32:         <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
 33:           Our Popular Treks
 34:         </h2>
 35:         <div className="w-24 h-1 bg-[#FF6B00] mx-auto rounded-full"></div>
 36:       </div>
 37: 
 38:       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
 39:         {treks.map((trek) => (
 40:           <article
 41:             key={trek.id}
 42:             className="group bg-white rounded-3xl overflow-hidden shadow-card
 43:                        hover:shadow-card-hover hover:scale-[1.03]
 44:                        transition-all duration-300 flex flex-col h-full"
 45:             aria-label={`${trek.title} — ${trek.price}`}
 46:           >
 47:             {/* Image */}
 48:             <div className="relative h-52 overflow-hidden flex-shrink-0">
 49:               <img
 50:                 src={trek.image}
 51:                 alt={`${trek.title} — ${trek.location}`}
 52:                 className="w-full h-full rounded-t-3xl object-cover transition-transform
 53:                            duration-700 group-hover:scale-110"
 54:                 loading="lazy"
 55:               />
 56:               <span className={`absolute top-3 left-3 ${trek.badgeColor} text-white
 57:                                 text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
 58:                 {trek.badge}
 59:               </span>
 60:               <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm
 61:                                text-brand-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
 62:                 {Array.isArray(trek.category) ? trek.category[0] : trek.category}
 63:               </span>
 64:               <span className="absolute bottom-3 left-3 flex items-center gap-1.5
 65:                                bg-black/60 backdrop-blur-sm text-white
 66:                                text-xs font-semibold px-3 py-1.5 rounded-full">
 67:                 <svg className="w-3.5 h-3.5 text-brand-orange"
 68:                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
 69:                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
 70:                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 71:                 </svg>
 72:                 {trek.days}D / {trek.nights}N
 73:               </span>
 74:               <div className="absolute bottom-0 inset-x-0 h-16
 75:                               bg-gradient-to-t from-black/50 to-transparent" />
 76:             </div>
 77: 
 78:             {/* Body */}
 79:             <div className="flex flex-col flex-1 p-5">
 80:               <div className="flex items-center gap-1 text-brand-gray text-xs font-medium mb-1.5">
 81:                 <svg className="w-3.5 h-3.5 text-brand-orange flex-shrink-0"
 82:                      fill="currentColor" viewBox="0 0 20 20">
 83:                   <path fillRule="evenodd"
 84:                         d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
 85:                         clipRule="evenodd" />
 86:                 </svg>
 87:                 <span className="truncate">{trek.location}</span>
 88:               </div>
 89: 
 90:               <h2 className="text-lg font-extrabold text-brand-black leading-snug mb-2
 91:                              group-hover:text-brand-blue transition-colors duration-300">
 92:                 {trek.title}
 93:               </h2>
 94: 
 95:               <StarRating rating={trek.rating} reviews={trek.reviews} />
 96: 
 97:               <span className={`mt-2 inline-block text-xs font-bold px-2.5 py-0.5
 98:                                 rounded-full w-fit ${difficultyStyle[trek.difficulty]}`}>
 99:                 {trek.difficulty}
100:               </span>
101: 
102:               <ul className="mt-3 space-y-1 flex-1" aria-label="Trip highlights">
103:                 {trek.highlights.slice(0, 3).map((h) => (
104:                   <li key={h} className="flex items-start gap-2 text-xs text-brand-gray font-medium">
105:                     <svg className="w-3.5 h-3.5 text-brand-orange mt-0.5 flex-shrink-0"
106:                          fill="currentColor" viewBox="0 0 20 20">
107:                       <path fillRule="evenodd"
108:                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
109:                             clipRule="evenodd" />
110:                     </svg>
111:                     {h}
112:                   </li>
113:                 ))}
114:               </ul>
115: 
116:               <div className="flex flex-wrap gap-1.5 mt-3">
117:                 {(trek.inclusions || []).slice(0, 3).map((inc) => (
118:                   <span key={inc}
119:                         className="bg-blue-50 text-brand-blue text-xs font-semibold
120:                                    px-2 py-0.5 rounded-lg">
121:                     {inc}
122:                   </span>
123:                 ))}
124:               </div>
125: 
126:               <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
127:                 <div>
128:                   <p className="text-2xl font-black text-brand-orange leading-none">{trek.price}</p>
129:                   <p className="text-xs text-brand-gray line-through mt-0.5">{trek.originalPrice}</p>
130:                   <p className="text-xs text-green-600 font-semibold">per person</p>
131:                 </div>
132:                 <Link
133:                   href={`/trek/${trek.slug}`}
134:                   className="inline-flex items-center gap-1.5
135:                              bg-brand-orange text-white font-bold text-sm
136:                              px-4 py-2.5 rounded-full shadow-orange-glow
137:                              transition-all duration-300
138:                              hover:bg-brand-orange-hover hover:scale-105
139:                              active:scale-95"
140:                   aria-label={`View details for ${trek.title}`}
141:                 >
142:                   View Details
143:                   <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
144:                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
145:                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
146:                           d="M13 7l5 5m0 0l-5 5m5-5H6" />
147:                   </svg>
148:                 </Link>
149:               </div>
150:             </div>
151:           </article>
152:         ))}
153:       </div>
154:     </section>
155:   );
156: }
````

## File: app/trek/components/TrekHeroIndex.js
````javascript
 1: export default function TrekHeroIndex() {
 2:   return (
 3:     <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
 4:       <div 
 5:         className="absolute inset-0 bg-cover bg-center" 
 6:         style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&q=80')` }}
 7:       />
 8:       {/* Black overlay for text readability */}
 9:       <div className="absolute inset-0 bg-black/50" />
10:       
11:       <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
12:         <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
13:           Adventure Treks
14:         </h1>
15:         <p className="text-lg md:text-2xl text-gray-200 mb-8 font-medium">
16:           Challenge Yourself • Experience Nature • Create Memories
17:         </p>
18:         <a 
19:           href="#treks"
20:           className="px-8 py-3 bg-[#FF6B00] hover:bg-[#e65c00] text-white font-semibold rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1"
21:         >
22:           Explore All Treks
23:         </a>
24:       </div>
25:     </section>
26:   );
27: }
````

## File: app/trek/components/TrekWhyUsIndex.js
````javascript
 1: import { GuideIcon, MountainIcon, LeafIcon } from '@/common/icons';
 2: 
 3: export default function TrekWhyUsIndex() {
 4:   return (
 5:     <section className="bg-white border-y border-gray-200 py-16">
 6:       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 7:         <h2 className="text-3xl font-bold text-center text-[#111827] mb-12">
 8:           Why Trek With Us?
 9:         </h2>
10:         
11:         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
12:           
13:           <div className="group bg-[#1E40AF]/5 rounded-2xl p-8 border border-[#1E40AF]/10 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
14:             <GuideIcon />
15:             <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Expert Local Guides</h3>
16:             <p className="text-gray-600 text-sm">
17:               Certified mountain guides who know the terrain, culture, and weather patterns inside out.
18:             </p>
19:           </div>
20: 
21:           <div className="group bg-[#1E40AF]/5 rounded-2xl p-8 border border-[#1E40AF]/10 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
22:             <MountainIcon />
23:             <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Safety First</h3>
24:             <p className="text-gray-600 text-sm">
25:               Fully equipped with medical kits, oxygen cylinders, and strict acclimatization protocols.
26:             </p>
27:           </div>
28: 
29:           <div className="group bg-[#1E40AF]/5 rounded-2xl p-8 border border-[#1E40AF]/10 flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
30:             <LeafIcon />
31:             <h3 className="text-lg font-bold text-[#1E40AF] mb-2">Eco-Friendly Treks</h3>
32:             <p className="text-gray-600 text-sm">
33:               Zero-trace policy. We respect the mountains and ensure our treks are fully sustainable.
34:             </p>
35:           </div>
36: 
37:         </div>
38:       </div>
39:     </section>
40:   );
41: }
````

## File: app/trek/page.js
````javascript
 1: import Navbar from '@/app/components/Navbar';
 2: import Footer from '@/app/components/Footer';
 3: import { getAllTreks } from '@/common/helper';
 4: 
 5: import TrekHeroIndex from './components/TrekHeroIndex';
 6: import TrekGridIndex from './components/TrekGridIndex';
 7: import TrekWhyUsIndex from './components/TrekWhyUsIndex';
 8: 
 9: export const metadata = {
10:   title: 'Adventure Treks — Travel • Trek • Ride',
11:   description: 'Challenge Yourself • Experience Nature • Create Memories. Explore our top Himalayan treks including Kedarkantha, Triund, Valley of Flowers, and more.',
12: };
13: 
14: export default async function TrekPage() {
15:   const treks = getAllTreks();
16: 
17:   return (
18:     <>
19:       <Navbar />
20:       <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
21:         {/* 1. Hero Section */}
22:         <TrekHeroIndex />
23: 
24:         {/* 2. Main Section - Trek Grid */}
25:         <TrekGridIndex treks={treks} />
26: 
27:         {/* 3. Small Section: Why Trek With Us? */}
28:         <TrekWhyUsIndex />
29:       </main>
30:       <Footer />
31:     </>
32:   );
33: }
````

## File: app/globals.css
````css
  1: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  2: 
  3: @tailwind base;
  4: @tailwind components;
  5: @tailwind utilities;
  6: 
  7: /* ─── Base Reset ─────────────────────────────────────────── */
  8: @layer base {
  9:   html {
 10:     scroll-behavior: smooth;
 11:     font-family: 'Inter', system-ui, sans-serif;
 12:   }
 13: 
 14:   body {
 15:     @apply bg-brand-light text-brand-black antialiased;
 16:   }
 17: 
 18:   * {
 19:     @apply box-border;
 20:   }
 21: }
 22: 
 23: /* ─── Component Utilities ────────────────────────────────── */
 24: @layer components {
 25:   /* Primary CTA Button */
 26:   .btn-orange {
 27:     @apply inline-flex items-center justify-center gap-2
 28:            bg-brand-orange text-white font-bold
 29:            px-6 py-3 rounded-full
 30:            shadow-orange-glow
 31:            transition-all duration-300
 32:            hover:bg-brand-orange-hover hover:scale-105 hover:shadow-lg
 33:            active:scale-95;
 34:   }
 35: 
 36:   /* Secondary CTA Button */
 37:   .btn-blue {
 38:     @apply inline-flex items-center justify-center gap-2
 39:            bg-brand-blue text-white font-bold
 40:            px-6 py-3 rounded-full
 41:            shadow-blue-glow
 42:            transition-all duration-300
 43:            hover:bg-brand-blue-dark hover:scale-105 hover:shadow-lg
 44:            active:scale-95;
 45:   }
 46: 
 47:   /* Ghost / Outline Button */
 48:   .btn-outline {
 49:     @apply inline-flex items-center justify-center gap-2
 50:            border-2 border-white text-white font-bold
 51:            px-6 py-3 rounded-full
 52:            transition-all duration-300
 53:            hover:bg-white hover:text-brand-black hover:scale-105
 54:            active:scale-95;
 55:   }
 56: 
 57:   /* Section heading shared style */
 58:   .section-heading {
 59:     @apply text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight;
 60:   }
 61: 
 62:   /* Card base */
 63:   .card-base {
 64:     @apply bg-white rounded-2xl overflow-hidden shadow-card
 65:            transition-all duration-300
 66:            hover:shadow-card-hover hover:scale-[1.03];
 67:   }
 68: 
 69:   /* Nav link */
 70:   .nav-link {
 71:     @apply text-brand-black font-semibold text-sm
 72:            relative py-1
 73:            transition-colors duration-200
 74:            hover:text-brand-orange
 75:            after:absolute after:bottom-0 after:left-0 after:right-0
 76:            after:h-0.5 after:bg-brand-orange after:scale-x-0
 77:            after:transition-transform after:duration-300
 78:            hover:after:scale-x-100;
 79:   }
 80: }
 81: 
 82: /* ─── Custom Scrollbar ───────────────────────────────────── */
 83: ::-webkit-scrollbar {
 84:   width: 6px;
 85:   height: 6px;
 86: }
 87: ::-webkit-scrollbar-track {
 88:   background: #f1f1f1;
 89: }
 90: ::-webkit-scrollbar-thumb {
 91:   background: #FF6B00;
 92:   border-radius: 3px;
 93: }
 94: ::-webkit-scrollbar-thumb:hover {
 95:   background: #E05F00;
 96: }
 97: 
 98: /* ─── Horizontal Scroller ────────────────────────────────── */
 99: .trips-scroll {
100:   scrollbar-width: thin;
101:   scrollbar-color: #FF6B00 #f1f1f1;
102: }
103: 
104: /* ─── Hero Overlay Gradient ─────────────────────────────── */
105: .hero-overlay {
106:   background: linear-gradient(
107:     to bottom,
108:     rgba(17,24,39,0.5) 0%,
109:     rgba(17,24,39,0.65) 50%,
110:     rgba(17,24,39,0.8) 100%
111:   );
112: }
113: 
114: /* ─── Orange Gradient Text ───────────────────────────────── */
115: .text-gradient-orange {
116:   background: linear-gradient(135deg, #FF6B00, #FFB347);
117:   -webkit-background-clip: text;
118:   -webkit-text-fill-color: transparent;
119:   background-clip: text;
120: }
121: 
122: /* ─── Scroll Indicator Bounce ────────────────────────────── */
123: @keyframes scrollBounce {
124:   0%, 100% { transform: translateY(0); }
125:   50%       { transform: translateY(10px); }
126: }
127: .scroll-indicator {
128:   animation: scrollBounce 2s ease-in-out infinite;
129: }
130: 
131: /* ─── Feature Card Icon Ring ─────────────────────────────── */
132: .icon-ring {
133:   @apply flex items-center justify-center w-16 h-16 rounded-full
134:          bg-orange-50 text-brand-orange text-3xl
135:          transition-all duration-300;
136: }
137: .card-base:hover .icon-ring {
138:   @apply bg-brand-orange text-white scale-110;
139: }
140: 
141: /* ─── Responsive Image Cover ─────────────────────────────── */
142: .img-cover {
143:   object-fit: cover;
144:   width: 100%;
145:   height: 100%;
146: }
````

## File: app/layout.js
````javascript
 1: import './globals.css';
 2: 
 3: export const metadata = {
 4:   title: 'Travel • Trek • Ride — Explore. Earn. Experience.',
 5:   description:
 6:     'Premium adventure travel platform. Book curated trips to Manali, Leh Ladakh, Rishikesh and more. EMI available, budget-friendly, community-driven.',
 7:   keywords: 'travel, trek, ride, adventure, manali, leh ladakh, rishikesh, bike expedition, group trips',
 8:   openGraph: {
 9:     title: 'Travel • Trek • Ride',
10:     description: 'Explore. Earn. Experience. — Premium adventure travel.',
11:     type: 'website',
12:     locale: 'en_IN',
13:   },
14: };
15: 
16: export default function RootLayout({ children }) {
17:   return (
18:     <html lang="en" className="scroll-smooth">
19:       <head>
20:         {/* Inter Font from Google */}
21:         <link rel="preconnect" href="https://fonts.googleapis.com" />
22:         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
23:         <link
24:           href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
25:           rel="stylesheet"
26:         />
27:       </head>
28:       <body className="font-sans antialiased bg-brand-light">{children}</body>
29:     </html>
30:   );
31: }
````

## File: app/page.js
````javascript
 1: import Navbar from './components/Navbar';
 2: import HeroSection from './components/HeroSection';
 3: import CategoriesSection from './components/CategoriesSection';
 4: import WhyUsSection from './components/WhyUsSection';
 5: import FeaturedTripsSection from './components/FeaturedTripsSection';
 6: import AmbassadorSection from './components/AmbassadorSection';
 7: import Footer from './components/Footer';
 8: 
 9: export default function HomePage() {
10:   return (
11:     <main className="min-h-screen">
12:       {/* 1. Sticky Navigation */}
13:       <Navbar />
14: 
15:       {/* 2. Hero — Full-viewport adventure visual */}
16:       <HeroSection />
17: 
18:       {/* 3. Adventure Categories — Travel / Trek / Ride */}
19:       <CategoriesSection />
20: 
21:       {/* 4. Why Choose Us — Feature highlights */}
22:       <WhyUsSection />
23: 
24:       {/* 5. Featured Trips — Horizontally scrollable cards */}
25:       <FeaturedTripsSection />
26: 
27:       {/* 6. Ambassador CTA — Dark full-width section */}
28:       <AmbassadorSection />
29: 
30:       {/* 7. Footer */}
31:       <Footer />
32:     </main>
33:   );
34: }
````

## File: common/components/BookingCard.js
````javascript
 1: /**
 2:  * app/travel/[slug]/components/BookingCard.js
 3:  * Sticky booking card — links to /travel/[slug]/booking
 4:  */
 5: import Link from 'next/link';
 6: 
 7: export default function BookingCard({ price, originalPrice, days, nights, title, slug }) {
 8: 
 9:   return (
10:     <div className="bg-white rounded-3xl shadow-card-hover p-6 sticky top-24 border border-gray-100">
11:       {/* EMI Badge */}
12:       <div className="flex items-center gap-2 bg-green-50 border border-green-200
13:                       rounded-2xl px-4 py-2 mb-5">
14:         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
15:         <span className="text-green-700 text-xs font-bold">0% EMI Available on all plans</span>
16:       </div>
17: 
18:       {/* Price */}
19:       <div className="mb-5">
20:         <p className="text-4xl font-black text-brand-orange">{price}</p>
21:         <div className="flex items-center gap-2 mt-1">
22:           <span className="text-sm text-brand-gray line-through">{originalPrice}</span>
23:           <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
24:             SAVE ₹{Number(originalPrice.replace(/[₹,]/g, '')) - Number(price.replace(/[₹,]/g, ''))} 🎉
25:           </span>
26:         </div>
27:         <p className="text-xs text-brand-gray mt-1">per person (twin sharing)</p>
28:       </div>
29: 
30:       {/* Duration */}
31:       <div className="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3 mb-5">
32:         <svg className="w-5 h-5 text-brand-blue flex-shrink-0" fill="none"
33:              stroke="currentColor" viewBox="0 0 24 24">
34:           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
35:                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
36:         </svg>
37:         <div>
38:           <p className="text-brand-black font-extrabold text-sm">{days} Days / {nights} Nights</p>
39:           <p className="text-brand-gray text-xs">Full Itinerary Included</p>
40:         </div>
41:       </div>
42: 
43:       {/* Features */}
44:       <ul className="space-y-2 mb-6">
45:         {['Free Cancellation (15 days)', 'Instant Booking Confirmation', '24/7 Travel Support', 'Expert Guide Included'].map((f) => (
46:           <li key={f} className="flex items-center gap-2 text-sm text-brand-gray font-medium">
47:             <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
48:               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
49:             </svg>
50:             {f}
51:           </li>
52:         ))}
53:       </ul>
54: 
55:       {/* Book Now CTA */}
56:       <Link
57:         href={`/travel/${slug}/booking`}
58:         id="book-now-btn"
59:         className="w-full bg-brand-orange text-white font-black text-lg
60:                    py-4 rounded-2xl shadow-orange-glow
61:                    transition-all duration-300
62:                    hover:bg-brand-orange-hover hover:scale-[1.02] hover:shadow-xl
63:                    active:scale-95 block text-center"
64:       >
65:         🎒 Book Now
66:       </Link>
67: 
68:       {/* Ambassador link */}
69:       <Link href="/"
70:             className="flex items-center justify-center gap-1.5 mt-4
71:                        text-brand-blue text-sm font-bold hover:underline">
72:         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
73:           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
74:                 d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
75:         </svg>
76:         Join as Ambassador &amp; Earn on this Trip
77:       </Link>
78: 
79:       {/* Trust badges */}
80:       <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-gray-100">
81:         {[
82:           { icon: '🔒', label: 'Secure Pay' },
83:           { icon: '⭐', label: 'Top Rated' },
84:           { icon: '✅', label: 'Verified' },
85:         ].map((b) => (
86:           <div key={b.label} className="text-center">
87:             <span className="text-2xl block">{b.icon}</span>
88:             <span className="text-xs text-brand-gray font-semibold">{b.label}</span>
89:           </div>
90:         ))}
91:       </div>
92:     </div>
93:   );
94: }
````

## File: common/components/BookingForm.js
````javascript
  1: 'use client';
  2: /**
  3:  * app/travel/[slug]/booking/components/BookingForm.js
  4:  * Full booking form + live total + Google Sheets + UPI payment
  5:  *
  6:  * ──────────────────────────────────────────────────────────────
  7:  * GOOGLE SHEETS SETUP (one-time):
  8:  *  1. Go to https://script.google.com → New Project
  9:  *  2. Paste the Apps Script code from bottom of this file (comment block)
 10:  *  3. Click Deploy → New Deployment → Web App
 11:  *     · Execute as: Me
 12:  *     · Who has access: Anyone
 13:  *  4. Copy the deployment URL and replace GOOGLE_SCRIPT_URL below
 14:  *
 15:  * UPI SETUP:
 16:  *  Replace UPI_VPA with your actual UPI ID (e.g., "business@okicici")
 17:  * ──────────────────────────────────────────────────────────────
 18:  */
 19: import { useState } from 'react';
 20: import Link from 'next/link';
 21: import Image from 'next/image';
 22: 
 23: /* ── CONFIG (change these before going live) ───────────────── */
 24: const GOOGLE_SCRIPT_URL =
 25:   'https://script.google.com/macros/s/AKfycbz87BsXXkME-o6TaQ6qXbGeJFHGq3dmLq5o7zjYRoP0DZ2dwMBSOqk4iwC52sBEIKI/exec';
 26: const UPI_VPA  = 'traveltrekride@okaxis'; // ← Replace with your UPI ID
 27: const UPI_NAME = 'TravelTrekRide';
 28: /* ─────────────────────────────────────────────────────────── */
 29: 
 30: const initialForm = {
 31:   name: '',
 32:   email: '',
 33:   phone: '',
 34:   address: '',
 35:   members: 1,
 36:   specialRequests: '',
 37: };
 38: 
 39: export default function BookingForm({ destination }) {
 40:   const [form, setForm]       = useState(initialForm);
 41:   const [errors, setErrors]   = useState({});
 42:   const [loading, setLoading] = useState(false);
 43:   const [step, setStep]       = useState('form'); // 'form' | 'success'
 44: 
 45:   /* Price maths */
 46:   const priceNum = Number(String(destination.price).replace(/[₹,]/g, ''));
 47:   const total    = priceNum * Number(form.members);
 48: 
 49:   /* Field change */
 50:   const handleChange = (e) => {
 51:     const { name, value } = e.target;
 52:     setForm((prev) => ({ ...prev, [name]: value }));
 53:     setErrors((prev) => ({ ...prev, [name]: '' }));
 54:   };
 55: 
 56:   /* Validation */
 57:   const validate = () => {
 58:     const e = {};
 59:     if (!form.name.trim())                            e.name    = 'Full name required';
 60:     if (!form.email.match(/^\S+@\S+\.\S+$/))          e.email   = 'Valid email required';
 61:     if (!form.phone.match(/^[6-9]\d{9}$/))            e.phone   = 'Valid 10-digit Indian mobile required';
 62:     if (!form.address.trim())                          e.address = 'Address required';
 63:     setErrors(e);
 64:     return Object.keys(e).length === 0;
 65:   };
 66: 
 67:   /* Submit → Google Sheets → UPI */
 68:   const handlePayNow = async () => {
 69:     if (!validate()) return;
 70:     setLoading(true);
 71: 
 72:     /* — Send to Google Sheets via Apps Script — */
 73:     try {
 74:       const payload = new URLSearchParams({
 75:         timestamp:       new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
 76:         name:            form.name,
 77:         email:           form.email,
 78:         phone:           form.phone,
 79:         address:         form.address,
 80:         package:         destination.title,
 81:         location:        destination.location,
 82:         duration:        `${destination.days}D / ${destination.nights}N`,
 83:         members:         form.members,
 84:         pricePerPerson:  destination.price,
 85:         totalAmount:     `₹${total.toLocaleString('en-IN')}`,
 86:         specialRequests: form.specialRequests || 'None',
 87:       });
 88: 
 89:       await fetch(GOOGLE_SCRIPT_URL, {
 90:         method: 'POST',
 91:         mode:   'no-cors',          // opaque response — data IS sent
 92:         body:   payload,
 93:       });
 94:     } catch (_) {
 95:       /* no-cors: errors here are normal; data still submitted */
 96:     }
 97: 
 98:     // /* — Build UPI deep-link — */
 99:     // const upiLink = [
100:     //   `upi://pay`,
101:     //   `?pa=${encodeURIComponent(UPI_VPA)}`,
102:     //   `&pn=${encodeURIComponent(UPI_NAME)}`,
103:     //   `&am=${total}`,
104:     //   `&cu=INR`,
105:     //   `&tn=${encodeURIComponent(`Booking for ${destination.title} by ${form.name}`)}`,
106:     // ].join('');
107: 
108:     setLoading(false);
109:     setStep('success');
110: 
111:     /* Open UPI app */
112:     // window.location.href = upiLink;
113:   };
114: 
115:   /* ── Success Screen ─────────────────────────────────────── */
116:   if (step === 'success') {
117:     return (
118:       <div className="max-w-xl mx-auto text-center py-16">
119:         <span className="text-7xl block mb-5">🎉</span>
120:         <h2 className="text-3xl font-black text-brand-black mb-3">
121:           Booking Submitted!
122:         </h2>
123:         <p className="text-brand-gray font-medium leading-relaxed mb-8">
124:           Your booking details for <strong>{destination.title}</strong> have
125:           been recorded. A UPI payment window should have opened on your device.
126:         </p>
127:         <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left mb-8">
128:           <p className="text-amber-800 font-bold text-sm mb-2">📲 After Payment:</p>
129:           <p className="text-amber-700 text-sm font-medium leading-relaxed">
130:             Please share your UPI transaction screenshot on{' '}
131:             <strong>WhatsApp</strong> or email us at{' '}
132:             <a href="mailto:bookings@traveltrekride.com"
133:                className="underline text-brand-orange">
134:               bookings@traveltrekride.com
135:             </a>{' '}
136:             for booking confirmation.
137:           </p>
138:         </div>
139:         <Link href="/travel"
140:               className="inline-flex items-center gap-2 bg-brand-orange text-white
141:                          font-black px-8 py-4 rounded-full shadow-orange-glow
142:                          hover:bg-brand-orange-hover hover:scale-105 transition-all duration-300">
143:           ← Browse More Trips
144:         </Link>
145:       </div>
146:     );
147:   }
148: 
149:   /* ── Main Form ──────────────────────────────────────────── */
150:   return (
151:     <div className="flex flex-col lg:flex-row gap-8 items-start">
152: 
153:       {/* ══ LEFT — Booking Form (60%) ══════════════════════ */}
154:       <div className="flex-1 min-w-0 bg-white rounded-3xl shadow-card p-6 sm:p-8
155:                       border border-gray-100">
156: 
157:         <h2 className="text-xl font-extrabold text-brand-black mb-1 flex items-center gap-2">
158:           <span className="w-1 h-6 bg-brand-orange rounded-full block" />
159:           Traveler Details
160:         </h2>
161:         <p className="text-brand-gray text-sm font-medium mb-7">
162:           Fill in your details — this will be saved for booking confirmation.
163:         </p>
164: 
165:         <div className="space-y-5">
166: 
167:           {/* Full Name */}
168:           <div>
169:             <label className="block text-sm font-bold text-brand-black mb-1.5">
170:               Full Name <span className="text-red-500">*</span>
171:             </label>
172:             <input
173:               type="text" name="name" value={form.name}
174:               onChange={handleChange} placeholder="Enter your full name"
175:               className={`w-full border rounded-xl px-4 py-3 text-sm font-medium
176:                           text-brand-black placeholder-gray-400 outline-none
177:                           focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
178:                           transition-all duration-200
179:                           ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
180:             />
181:             {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
182:           </div>
183: 
184:           {/* Email + Phone side-by-side on sm+ */}
185:           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
186:             <div>
187:               <label className="block text-sm font-bold text-brand-black mb-1.5">
188:                 Email Address <span className="text-red-500">*</span>
189:               </label>
190:               <input
191:                 type="email" name="email" value={form.email}
192:                 onChange={handleChange} placeholder="you@example.com"
193:                 className={`w-full border rounded-xl px-4 py-3 text-sm font-medium
194:                             text-brand-black placeholder-gray-400 outline-none
195:                             focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
196:                             transition-all duration-200
197:                             ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
198:               />
199:               {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
200:             </div>
201:             <div>
202:               <label className="block text-sm font-bold text-brand-black mb-1.5">
203:                 Phone Number <span className="text-red-500">*</span>
204:               </label>
205:               <input
206:                 type="tel" name="phone" value={form.phone}
207:                 onChange={handleChange} placeholder="10-digit mobile"
208:                 maxLength={10}
209:                 className={`w-full border rounded-xl px-4 py-3 text-sm font-medium
210:                             text-brand-black placeholder-gray-400 outline-none
211:                             focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
212:                             transition-all duration-200
213:                             ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
214:               />
215:               {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
216:             </div>
217:           </div>
218: 
219:           {/* Address */}
220:           <div>
221:             <label className="block text-sm font-bold text-brand-black mb-1.5">
222:               Home Address <span className="text-red-500">*</span>
223:             </label>
224:             <textarea
225:               name="address" value={form.address}
226:               onChange={handleChange} rows={3}
227:               placeholder="House no., Street, City, State, PIN"
228:               className={`w-full border rounded-xl px-4 py-3 text-sm font-medium resize-none
229:                           text-brand-black placeholder-gray-400 outline-none
230:                           focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
231:                           transition-all duration-200
232:                           ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
233:             />
234:             {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>}
235:           </div>
236: 
237:           {/* Number of Members */}
238:           <div>
239:             <label className="block text-sm font-bold text-brand-black mb-1.5">
240:               Number of Travelers
241:             </label>
242:             <select
243:               name="members" value={form.members}
244:               onChange={handleChange}
245:               className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3
246:                          text-sm font-medium text-brand-black outline-none
247:                          focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
248:                          transition-all duration-200 cursor-pointer"
249:             >
250:               {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
251:                 <option key={n} value={n}>
252:                   {n} {n === 1 ? 'Traveler' : 'Travelers'}
253:                 </option>
254:               ))}
255:             </select>
256:           </div>
257: 
258:           {/* Special Requests */}
259:           <div>
260:             <label className="block text-sm font-bold text-brand-black mb-1.5">
261:               Special Requests{' '}
262:               <span className="text-brand-gray font-medium">(Optional)</span>
263:             </label>
264:             <textarea
265:               name="specialRequests" value={form.specialRequests}
266:               onChange={handleChange} rows={3}
267:               placeholder="Any dietary needs, accessibility requirements, room preferences..."
268:               className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3
269:                          text-sm font-medium resize-none text-brand-black
270:                          placeholder-gray-400 outline-none
271:                          focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange
272:                          transition-all duration-200"
273:             />
274:           </div>
275: 
276:         </div>{/* end space-y-5 */}
277: 
278:         {/* Security note */}
279:         <div className="flex items-start gap-2 mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
280:           <svg className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
281:             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
282:           </svg>
283:           <p className="text-brand-blue text-xs font-medium leading-relaxed">
284:             Your data is encrypted and never shared with third parties.
285:             It is used only to process your booking.
286:           </p>
287:         </div>
288:       </div>{/* end left col */}
289: 
290:       {/* ══ RIGHT — Sticky Booking Summary (40%) ═══════════ */}
291:       <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-5 lg:sticky lg:top-24">
292: 
293:         {/* Package Card */}
294:         <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
295:           <div className="relative h-44">
296:             <img src={destination.image} alt={destination.title}
297:                  className="w-full h-full object-cover" />
298:             <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
299:             <span className="absolute bottom-3 left-4 text-white font-extrabold text-base leading-snug
300:                              drop-shadow-sm max-w-[85%]">
301:               {destination.title}
302:             </span>
303:           </div>
304: 
305:           <div className="p-5 space-y-3">
306:             <div className="flex justify-between items-center text-sm">
307:               <span className="text-brand-gray font-medium">📍 Location</span>
308:               <span className="text-brand-black font-bold text-right">{destination.location}</span>
309:             </div>
310:             <div className="flex justify-between items-center text-sm">
311:               <span className="text-brand-gray font-medium">🗓️ Duration</span>
312:               <span className="text-brand-black font-bold">{destination.days}D / {destination.nights}N</span>
313:             </div>
314:             <div className="flex justify-between items-center text-sm">
315:               <span className="text-brand-gray font-medium">👤 Price/Person</span>
316:               <span className="text-brand-orange font-extrabold">{destination.price}</span>
317:             </div>
318:             <div className="flex justify-between items-center text-sm">
319:               <span className="text-brand-gray font-medium">👥 Travelers</span>
320:               <span className="text-brand-black font-bold">{form.members}</span>
321:             </div>
322: 
323:             <div className="border-t border-gray-100 pt-3">
324:               <div className="flex justify-between items-center">
325:                 <span className="text-brand-black font-extrabold">Total Amount</span>
326:                 <span className="text-2xl font-black text-brand-orange">
327:                   ₹{total.toLocaleString('en-IN')}
328:                 </span>
329:               </div>
330:               <p className="text-xs text-brand-gray mt-0.5 font-medium">
331:                 ({form.members} × {destination.price})
332:               </p>
333:             </div>
334:           </div>
335:         </div>
336: 
337:         {/* Payment Section */}
338:         <div className="bg-white  mt-5 rounded-3xl shadow-card border border-gray-100 p-5">
339:           <h3 className="font-extrabold text-brand-black mb-4 flex items-center gap-2">
340:             <span className="w-1 h-5 bg-brand-orange rounded-full block" />
341:             Choose Payment Method
342:           </h3>
343: 
344:           {/* UPI Option */}
345:           <div className="border-2 border-brand-orange bg-orange-50 rounded-2xl p-4 mb-5">
346:             <div className="flex items-center justify-center gap-3 mb-3">
347:               
348:               <div>
349:                 <p className="font-extrabold text-brand-black text-sm mb-3">UPI Payment</p>
350:                 {/* <p className="text-brand-gray text-xs font-medium">
351:                   Google Pay · PhonePe · Paytm · BHIM
352:                 </p> */}
353:                 <Image src="/img/payment-qrcode-2.jpeg" width={300} height={300} alt="UPI QR Code" />
354:                 <p className="mt-3 mb-3">
355:                   UPI ID: <span className="font-bold">7027084436@ybl</span>
356:                 </p>
357:               </div>
358:             
359:             </div>
360:             
361:           </div>
362: 
363:           {/* Pay Now button */}
364:           <button
365:             onClick={handlePayNow}
366:             disabled={loading}
367:             id="pay-now-upi-btn"
368:             className="w-full bg-brand-orange text-white font-black text-base
369:                        py-4 rounded-2xl shadow-orange-glow
370:                        transition-all duration-300 flex items-center justify-center gap-2
371:                        hover:bg-brand-orange-hover hover:scale-[1.02] hover:shadow-xl
372:                        active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
373:                        disabled:scale-100"
374:           >
375:             {loading ? (
376:               <>
377:                 <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
378:                   <circle className="opacity-25" cx="12" cy="12" r="10"
379:                           stroke="currentColor" strokeWidth="4"/>
380:                   <path className="opacity-75" fill="currentColor"
381:                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
382:                 </svg>
383:                 Processing…
384:               </>
385:             ) : (
386:               <>📱 Pay ₹{total.toLocaleString('en-IN')} via UPI</>
387:             )}
388:           </button>
389: 
390:           {/* Trust row */}
391:           <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 text-center">
392:             {[['🔒','Secure'], ['✅','Verified'], ['📞','24/7 Support']].map(([icon, label]) => (
393:               <div key={label}>
394:                 <span className="text-xl block">{icon}</span>
395:                 <span className="text-xs text-brand-gray font-semibold">{label}</span>
396:               </div>
397:             ))}
398:           </div>
399:         </div>
400: 
401:         {/* After payment note */}
402:         <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
403:           <p className="text-amber-800 text-xs font-medium leading-relaxed">
404:             <span className="font-extrabold block mb-1">📲 After payment:</span>
405:             Share your UPI transaction screenshot on{' '}
406:             <Link href="https://wa.me/918571898895"><strong>WhatsApp </strong></Link> or email us at{' '}
407:             <a href="mailto:pocketravels.tech@gmail.com"
408:                className="underline text-brand-orange font-bold">
409:               pocketravels.tech@gmail.com
410:             </a>{' '}
411:             for instant booking confirmation.
412:           </p>
413:         </div>
414: 
415:       </aside>{/* end right col */}
416: 
417:     </div>
418:   );
419: }
420: 
421: /*
422: ═══════════════════════════════════════════════════════════════
423:   GOOGLE APPS SCRIPT CODE — Paste this at script.google.com
424: ═══════════════════════════════════════════════════════════════
425: 
426: function doPost(e) {
427:   try {
428:     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
429:     var p = e.parameter;
430: 
431:     // Add headers if sheet is empty
432:     if (sheet.getLastRow() === 0) {
433:       sheet.appendRow([
434:         'Timestamp','Name','Email','Phone','Address',
435:         'Package','Location','Duration','Travelers',
436:         'Price/Person','Total Amount','Special Requests'
437:       ]);
438:     }
439: 
440:     sheet.appendRow([
441:       p.timestamp, p.name, p.email, p.phone, p.address,
442:       p.package, p.location, p.duration, p.members,
443:       p.pricePerPerson, p.totalAmount, p.specialRequests
444:     ]);
445: 
446:     return ContentService
447:       .createTextOutput(JSON.stringify({ status: 'success' }))
448:       .setMimeType(ContentService.MimeType.JSON);
449:   } catch(err) {
450:     return ContentService
451:       .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
452:       .setMimeType(ContentService.MimeType.JSON);
453:   }
454: }
455: 
456: ═══════════════════════════════════════════════════════════════
457: */
````

## File: common/components/FAQSection.js
````javascript
  1: "use client";
  2: /**
  3:  * app/travel/[slug]/components/FAQSection.js
  4:  * Accordion FAQ — uses react-animate-height for smooth animated open/close.
  5:  */
  6: 
  7: import { useState } from 'react';
  8: import AnimateHeight from 'react-animate-height';
  9: 
 10: function FAQItem({ faq, index }) {
 11:   const [open, setOpen] = useState(false);
 12: 
 13:   return (
 14:     <div
 15:       className={`border rounded-2xl overflow-hidden transition-all duration-300
 16:                   ${open ? 'border-brand-orange shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
 17:     >
 18:       {/* Question Button */}
 19:       <button
 20:         onClick={() => setOpen(!open)}
 21:         className="w-full flex items-center justify-between px-6 py-5 text-left
 22:                    hover:bg-orange-50 transition-colors duration-200 focus:outline-none
 23:                     focus:ring-inset focus:ring-brand-orange/30"
 24:         aria-expanded={open}
 25:         aria-controls={`faq-answer-${index}`}
 26:         id={`faq-btn-${index}`}
 27:       >
 28:         <span className="font-bold text-brand-black text-sm sm:text-base pr-6 leading-snug">
 29:           {faq.q}
 30:         </span>
 31: 
 32:         {/* Animated +/× icon */}
 33:         <span
 34:           className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center
 35:                       justify-center font-black text-lg leading-none
 36:                       transition-all duration-300
 37:                       ${open
 38:                         ? 'border-brand-orange text-brand-orange bg-orange-50 rotate-45'
 39:                         : 'border-gray-300 text-gray-400 bg-white'
 40:                       }`}
 41:           aria-hidden="true"
 42:         >
 43:           +
 44:         </span>
 45:       </button>
 46: 
 47:       {/* Animated Answer — smooth slide via react-animate-height */}
 48:       <AnimateHeight
 49:         id={`faq-answer-${index}`}
 50:         duration={320}
 51:         height={open ? 'auto' : 0}
 52:         easing="ease-in-out"
 53:       >
 54:         <div className="px-6 pb-6 pt-2 border-t border-gray-100">
 55:           <p className="text-brand-gray text-sm font-medium leading-relaxed">
 56:             {faq.a}
 57:           </p>
 58:         </div>
 59:       </AnimateHeight>
 60:     </div>
 61:   );
 62: }
 63: 
 64: export default function FAQSection({ faqs }) {
 65:   return (
 66:     <section
 67:       id="faq"
 68:       className="py-16 md:py-20 bg-white"
 69:       aria-labelledby="faq-heading"
 70:     >
 71:       <div className="max-w-3xl mx-auto px-4 sm:px-6">
 72: 
 73:         {/* Header */}
 74:         <div className="text-center mb-10">
 75:           <span className="inline-block bg-orange-100 text-brand-orange text-sm font-bold
 76:                            px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
 77:             FAQs
 78:           </span>
 79:           <h2
 80:             id="faq-heading"
 81:             className="text-3xl md:text-4xl font-extrabold text-brand-black"
 82:           >
 83:             Frequently Asked Questions
 84:           </h2>
 85:           <p className="text-brand-gray font-medium mt-2 text-sm">
 86:             Still have questions?{' '}
 87:             <a href="/" className="text-brand-orange font-bold hover:underline">
 88:               Chat with our expert
 89:             </a>
 90:           </p>
 91:         </div>
 92: 
 93:         {/* FAQ List */}
 94:         <div className="space-y-3">
 95:           {faqs.map((faq, i) => (
 96:             <FAQItem key={i} faq={faq} index={i} />
 97:           ))}
 98:         </div>
 99: 
100:       </div>
101:     </section>
102:   );
103: }
````

## File: common/helper.js
````javascript
  1: /**
  2:  * common/helper.js
  3:  * Single Source of Truth for all Travel, Trek, and Ride packages.
  4:  */
  5: 
  6: export const destinations = [
  7:   {
  8:     id: 1,
  9:     title: "Rishikesh",
 10:     subtitle: "Adventure capital of India",
 11:     slug: "rishikesh",
 12:     category: ["travel", "trek"],
 13:     image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=80&fit=crop",
 14:     price: "₹7,999", priceRaw: 7999, originalPrice: "₹9,500",
 15:     days: 3, nights: 2, duration: "3 Days / 2 Nights",
 16:     distance: "250 km", bike: "Royal Enfield Classic 350", route: "Delhi → Rishikesh",
 17:     difficulty: "Moderate",
 18:     location: "Uttarakhand, India",
 19:     badge: "🔥 Top Adventure", badgeColor: "bg-green-600",
 20:     rating: 4.8, reviews: 640,
 21:     description: "Rishikesh is the ultimate destination for thrill-seekers and spiritual seekers alike. Set against the backdrop of the Himalayas and the pristine Ganges River, this town offers the best river rafting in India. When you aren't battling the rapids, you can bungee jump from epic heights, trek up to hidden waterfalls, or soak in the serene Ganga Aarti at Triveni Ghat. It perfectly balances adrenaline-pumping activities with profound peacefulness.",
 22:     highlights: [
 23:       "Thrilling 16km White Water River Rafting",
 24:       "Cliff Jumping into the Ganges",
 25:       "Attend the mesmerising evening Ganga Aarti",
 26:       "Trek to the secluded Neer Garh Waterfall",
 27:       "Campfire nights under the starry sky"
 28:     ],
 29:     itinerary: [
 30:       { day: 1, title: "Arrival & Riverside Camping", activities: ["Arrive at the campsite in Shivpuri", "Welcome drinks and lunch", "Evening beach volleyball and bonfire"] },
 31:       { day: 2, title: "River Rafting & Aarti", activities: ["16km thrilling river rafting from Shivpuri", "Cliff jumping and body surfing", "Evening visit to Triveni Ghat for Ganga Aarti"] },
 32:       { day: 3, title: "Waterfall Trek & Departure", activities: ["Morning trek to Neer Garh waterfall", "Breakfast at camp", "Check-out and departure"] }
 33:     ],
 34:     inclusions: ["2 Nights AC Swiss Tent accommodation", "6 buffet meals", "16km River Rafting", "Evening Bonfire"],
 35:     exclusions: ["Transport to Rishikesh", "Bungee Jumping", "Personal expenses"],
 36:     galleryImages: [
 37:       "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80&fit=crop",
 38:       "https://images.unsplash.com/photo-1544648790-25e2e8eab715?w=600&q=80&fit=crop",
 39:       "https://images.unsplash.com/photo-1574068576419-f55dbbbcc539?w=600&q=80&fit=crop",
 40:       "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?w=600&q=80&fit=crop"
 41:     ],
 42:     faqs: [
 43:       { q: "Is river rafting safe for beginners?", a: "Absolutely! You will be accompanied by certified guides." }
 44:     ],
 45:     safetyNote: "All rafting equipment is ISO certified. Guides hold advanced swift-water rescue certifications."
 46:   },
 47:   {
 48:     id: 2,
 49:     title: "Kasol & Kheerganga",
 50:     subtitle: "Mountain paradise and trekking",
 51:     slug: "kasol-kheerganga",
 52:     category: ["travel", "trek"],
 53:     image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80&fit=crop",
 54:     price: "₹6,499", priceRaw: 6499, originalPrice: "₹8,000",
 55:     days: 4, nights: 3, duration: "4 Days / 3 Nights",
 56:     distance: "530 km", bike: "Himalayan 411", route: "Delhi → Kasol → Barshaini",
 57:     difficulty: "Moderate",
 58:     location: "Parvati Valley, Himachal",
 59:     badge: "🌲 Nature Escape", badgeColor: "bg-emerald-600",
 60:     rating: 4.7, reviews: 850,
 61:     description: "Nestled beautifully in the Parvati Valley, Kasol is a haven for backpackers, while the Kheerganga trek offers a mesmerizing journey through majestic pine forests and pristine streams. The highlight of the trip is reaching the top of Kheerganga to bathe in the natural hot springs while surrounded by snow-capped Himalayan peaks. Experience the hippie cafe culture of Kasol and the absolute tranquility of the mountains in one unforgettable trip.",
 62:     highlights: [
 63:       "Camp under the stars in Kasol",
 64:       "Trek through deep pine forests to Kheerganga",
 65:       "Take a dip in the natural hot water springs",
 66:       "Cafe hopping in the hippie town of Kasol",
 67:       "Visit the holy Manikaran Sahib Gurudwara"
 68:     ],
 69:     itinerary: [
 70:       { day: 1, title: "Reach Kasol & Explore", activities: ["Arrive in Kasol, check into camps", "Explore local cafes and Israeli markets", "Walk along the Parvati River"] },
 71:       { day: 2, title: "Trek to Kheerganga", activities: ["Drive to Barshaini (base point)", "Start the 12km scenic trek", "Reach the top, relax in hot springs", "Bonfire and dinner at the summit camp"] },
 72:       { day: 3, title: "Descend and Manikaran Visit", activities: ["Wake up to sunrise views", "Trek down to Barshaini", "Visit Manikaran Sahib and hot caves", "Return to Kasol"] },
 73:       { day: 4, title: "Departure", activities: ["Enjoy a relaxed morning breakfast", "Depart back home"] }
 74:     ],
 75:     inclusions: ["3 Nights Camping (Kasol + Kheerganga)", "Breakfast and Dinner", "Trekking Guide", "Transport from Kasol to Barshaini"],
 76:     exclusions: ["Lunch", "Porter charges for luggage", "Travel to Kasol"],
 77:     galleryImages: [
 78:       "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80&fit=crop",
 79:       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&fit=crop",
 80:       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fit=crop",
 81:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop"
 82:     ],
 83:     faqs: [
 84:       { q: "How difficult is the Kheerganga trek?", a: "It is a moderate 12km trek. Beginners with basic fitness can easily do it in 5-6 hours." }
 85:     ],
 86:     safetyNote: "Forest trails are well-marked. Guides carry basic first-aid kits."
 87:   },
 88:   {
 89:     id: 3,
 90:     title: "Manali",
 91:     subtitle: "Snowy peaks and scenic beauty",
 92:     slug: "manali",
 93:     category: ["travel", "trek"],
 94:     image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80&fit=crop",
 95:     price: "₹9,999", priceRaw: 9999, originalPrice: "₹12,500",
 96:     days: 5, nights: 4, duration: "5 Days / 4 Nights",
 97:     distance: "550 km", bike: "Classic 350", route: "Delhi → Manali → Solang Valley",
 98:     difficulty: "Easy",
 99:     location: "Himachal Pradesh",
100:     badge: "❄️ Winter Wonderland", badgeColor: "bg-blue-500",
101:     rating: 4.8, reviews: 1120,
102:     description: "Manali is India's most loved hill station, offering an intoxicating blend of snowy peaks, meandering rivers, and ancient temples. Whether you want to witness snowfall in the Solang Valley, walk through the towering Deodar forests towards Hadimba Temple, or just sip hot cocoa at a cozy cafe in Old Manali, this destination serves up pure magic. It is also the gateway to high-altitude motorcycle adventures.",
103:     highlights: [
104:       "Experience snow activities in Solang Valley",
105:       "Visit the historical Hadimba Devi Temple",
106:       "Shop at the bustling Mall Road",
107:       "Explore the rustic charm of Old Manali cafes",
108:       "Drive through the engineering marvel, Atal Tunnel"
109:     ],
110:     itinerary: [
111:       { day: 1, title: "Arrival & Local Sightseeing", activities: ["Check-in to a premium hotel", "Visit Hadimba Temple and Vashisht Hot Springs", "Evening stroll on Mall Road"] },
112:       { day: 2, title: "Solang Valley Adventure", activities: ["Full day trip to Solang Valley", "Try paragliding, zorbing, and skiing", "Return to hotel for dinner"] },
113:       { day: 3, title: "Atal Tunnel & Sissu", activities: ["Drive through the 9km long Atal Tunnel", "Witness the majestic waterfall at Sissu in Lahaul Valley", "Return to Manali"] },
114:       { day: 4, title: "Old Manali Exploration", activities: ["Day at leisure in Old Manali", "Cafe hopping and live music", "Buy local Himalayan souvenirs"] },
115:       { day: 5, title: "Departure", activities: ["Morning checkout and departure"] }
116:     ],
117:     inclusions: ["4 Nights Hotel Stay", "Breakfast and Dinner", "Local sightseeing cab", "Atal Tunnel tour"],
118:     exclusions: ["Adventure activity fees in Solang", "Lunch", "Volvo tickets to Manali"],
119:     galleryImages: [
120:       "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80&fit=crop",
121:       "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop",
122:       "https://images.unsplash.com/photo-1596707255850-2f95fcb62141?w=600&q=80&fit=crop",
123:       "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80&fit=crop"
124:     ],
125:     faqs: [
126:       { q: "Will we see snow?", a: "Yes, Solang Valley and Sissu typically have snow from December to April." }
127:     ],
128:     safetyNote: "Ensure heavy woolens are packed for sub-zero night temperatures."
129:   },
130:   {
131:     id: 4,
132:     title: "Goa",
133:     subtitle: "Beaches, music, and chill vibes",
134:     slug: "goa",
135:     category: ["travel"],
136:     image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80&fit=crop",
137:     price: "₹12,499", priceRaw: 12499, originalPrice: "₹15,000",
138:     days: 4, nights: 3, duration: "4 Days / 3 Nights",
139:     distance: "600 km", bike: "KTM RC 390", route: "Mumbai → Goa",
140:     difficulty: "Easy",
141:     location: "Goa, India",
142:     badge: "🏖️ Tropical Escape", badgeColor: "bg-cyan-500",
143:     rating: 4.6, reviews: 2310,
144:     description: "Swap the mountains for golden sand and ocean waves. Goa is the ultimate tropical escape, famous for its unbroken coastline, vibrant nightlife, Portuguese heritage, and laid-back shack culture. From the bustling parties of Baga and Anjuna in the North to the serene, untouched beaches of Palolem in the South, Goa offers a perfect holiday for anyone looking to unwind, feast on seafood, and dance under the stars.",
145:     highlights: [
146:       "Sunset views at Chapora Fort (Dil Chahta Hai fort)",
147:       "Vibrant beach parties at Anjuna",
148:       "Water sports at Calangute beach",
149:       "Explore the heritage basilicas in Old Goa",
150:       "Relax in beach shacks with Goan seafood"
151:     ],
152:     itinerary: [
153:       { day: 1, title: "Arrival & Beach Time", activities: ["Check into resort in North Goa", "Relax by the pool", "Evening visit to Baga Beach and Tito's Lane"] },
154:       { day: 2, title: "Forts & Sunsets", activities: ["Visit Aguada Fort", "Explore Vagator Beach", "Sunset from Chapora Fort", "Dinner at Curlies"] },
155:       { day: 3, title: "Old Goa Heritage & Cruise", activities: ["Visit Basilica of Bom Jesus (UNESCO site)", "Walk through Fontainhas (Latin Quarter)", "Evening Mandovi river cruise"] },
156:       { day: 4, title: "Departure", activities: ["Morning beach walk", "Checkout and fly back"] }
157:     ],
158:     inclusions: ["3 Nights 3-Star Resort Stay & Pool Access", "Daily Breakfast", "Airport/Station pickup & drop"],
159:     exclusions: ["Flights to Goa", "Lunch and Dinner", "Water sports fees", "Scooty rentals"],
160:     galleryImages: [
161:       "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80&fit=crop",
162:       "https://images.unsplash.com/photo-1580100586938-02822d99c4a0?w=600&q=80&fit=crop",
163:       "https://images.unsplash.com/photo-1620023594830-ecfe504d6df1?w=600&q=80&fit=crop",
164:       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&fit=crop"
165:     ],
166:     faqs: [
167:       { q: "Is it North or South Goa?", a: "This itinerary focuses primarily on the vibrant culture of North Goa." }
168:     ],
169:     safetyNote: "Swim only in zones overseen by certified Drishti lifeguards."
170:   },
171:   {
172:     id: 5,
173:     title: "Jaipur & Pushkar",
174:     subtitle: "Cultural immersion and heritage",
175:     slug: "jaipur-pushkar",
176:     category: ["travel"],
177:     image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80&fit=crop",
178:     price: "₹10,500", priceRaw: 10500, originalPrice: "₹13,000",
179:     days: 4, nights: 3, duration: "4 Days / 3 Nights",
180:     distance: "400 km", bike: "Meteor 350", route: "Delhi → Jaipur → Pushkar",
181:     difficulty: "Easy",
182:     location: "Rajasthan, India",
183:     badge: "👑 Royal Safari", badgeColor: "bg-pink-600",
184:     rating: 4.7, reviews: 540,
185:     description: "Dive deep into the rich historical legacy of Rajasthan. Start at the magnificent Pink City of Jaipur, exploring grand royal palaces, ancient astronomical observatories, and hill-top forts. Then transition to the spiritual and deeply rustic town of Pushkar, famous for its holy lake, the world's only Brahma Temple, and its vibrant bohemian desert culture.",
186:     highlights: [
187:       "Jeep Safari to the majestic Amer Fort",
188:       "Photo stops at Hawa Mahal and Jal Mahal",
189:       "Experience the holy Pushkar Lake aarti",
190:       "Camel ride in the Pushkar desert dunes",
191:       "Savor authentic Rajasthani Dal Bati Churma"
192:     ],
193:     itinerary: [
194:       { day: 1, title: "Arrive in Jaipur", activities: ["Check into a heritage Haveli", "Visit City Palace & Jantar Mantar", "Evening sunset at Nahargarh Fort"] },
195:       { day: 2, title: "Amer Fort & Transfer to Pushkar", activities: ["Morning visit to Amer Fort", "Drive to Pushkar (3 hours)", "Check into desert camps"] },
196:       { day: 3, title: "Pushkar Lake & Safari", activities: ["Visit the Brahma Temple", "Walk around Pushkar Lake ghats", "Evening camel safari in the dunes"] },
197:       { day: 4, title: "Departure", activities: ["Breakfast in Pushkar", "Drive back to Delhi/Jaipur Airport"] }
198:     ],
199:     inclusions: ["3 Nights Heritage Haveli/Camp Stay", "Daily Breakfast & 1 Traditional Dinner", "Intercity cab transfers"],
200:     exclusions: ["Monument Entry Fees", "Camel Safari costs", "Lunch"],
201:     galleryImages: [
202:       "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80&fit=crop",
203:       "https://images.unsplash.com/photo-1600868779904-44ed1d227b4e?w=600&q=80&fit=crop",
204:       "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?w=600&q=80&fit=crop",
205:       "https://images.unsplash.com/photo-1580100586938-02822d99c4a0?w=600&q=80&fit=crop"
206:     ],
207:     faqs: [
208:       { q: "Is the desert camp AC?", a: "Yes, we provide premium AC Swiss tents in Pushkar." }
209:     ],
210:     safetyNote: "Stay hydrated in the desert. Only use licensed tour guides inside the Forts."
211:   },
212:   {
213:     id: 6,
214:     title: "Udaipur",
215:     subtitle: "Lake city's romantic charm",
216:     slug: "udaipur",
217:     category: ["travel"],
218:     image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80&fit=crop",
219:     price: "₹14,999", priceRaw: 14999, originalPrice: "₹18,000",
220:     days: 4, nights: 3, duration: "4 Days / 3 Nights",
221:     distance: "700 km", bike: "Interceptor 650", route: "Jaipur → Udaipur",
222:     difficulty: "Easy",
223:     location: "Rajasthan, India",
224:     badge: "✨ Premium Leisure", badgeColor: "bg-purple-600",
225:     rating: 4.9, reviews: 410,
226:     description: "Known as the Venice of the East, Udaipur is arguably India's most romantic city. Surrounded by the ancient Aravalli mountains and dominated by the shimmering Lake Pichola, the city feels like stepping into a royal fairy tale. You will explore opulent palaces that seemingly float on water, walk through narrow streets filled with traditional art, and dine at exquisite rooftop restaurants with panoramic lake views.",
227:     highlights: [
228:       "Boat ride on Lake Pichola at sunset",
229:       "Tour the massive City Palace complex",
230:       "Visit the beautiful Saheliyon ki Bari",
231:       "Dinner at a lakeside rooftop cafe",
232:       "Excursion to the Sajjangarh Monsoon Palace"
233:     ],
234:     itinerary: [
235:       { day: 1, title: "Arrival & Lakeside Relaxing", activities: ["Check into a Lake-facing hotel", "Evening boat ride on Lake Pichola viewing Jag Mandir", "Dinner by the lake"] },
236:       { day: 2, title: "City Palace & Culture", activities: ["Extensive tour of City Palace", "Visit Jagdish Temple", "Evening cultural dance show at Bagore Ki Haveli"] },
237:       { day: 3, title: "Monsoon Palace Excursion", activities: ["Visit Saheliyon ki Bari (Courtyard of Maidens)", "Drive up to Sajjangarh Monsoon Palace for panoramic sunset views over the Aravallis"] },
238:       { day: 4, title: "Departure", activities: ["Souvenir shopping (miniature paintings & handicrafts)", "Airport drop"] }
239:     ],
240:     inclusions: ["3 Nights Lake-facing Hotel", "Daily Breakfast", "Boat Ride Tickets", "Airport Pick/Drop"],
241:     exclusions: ["Monument fees", "Lunch & Dinner", "Personal shopping"],
242:     galleryImages: [
243:       "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80&fit=crop",
244:       "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80&fit=crop",
245:       "https://images.unsplash.com/photo-1600868779904-44ed1d227b4e?w=600&q=80&fit=crop",
246:       "https://images.unsplash.com/photo-1544648790-25e2e8eab715?w=600&q=80&fit=crop"
247:     ],
248:     faqs: [
249:       { q: "Are the rooftop dinners included?", a: "No, meals other than breakfast are excluded so you can explore Udaipur's fantastic food scene your way." }
250:     ],
251:     safetyNote: "City Palace has high staircases. Wear comfortable walking shoes."
252:   },
253:   {
254:     id: 7,
255:     title: "McLeodganj & Triund",
256:     subtitle: "Tibetan culture meets adventure",
257:     slug: "mcleodganj-triund",
258:     category: ["travel", "trek"],
259:     image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=1200&q=80&fit=crop",
260:     price: "₹6,999", priceRaw: 6999, originalPrice: "₹8,500",
261:     days: 4, nights: 3, duration: "4 Days / 3 Nights",
262:     distance: "480 km", bike: "Himalayan 411", route: "Delhi → Dharamshala",
263:     difficulty: "Moderate",
264:     location: "Dharamshala, Himachal",
265:     badge: "⛰️ Peak Thrills", badgeColor: "bg-orange-600",
266:     rating: 4.8, reviews: 760,
267:     description: "Welcome to 'Little Lhasa'. McLeodganj offers a deep dive into tranquil Tibetan Buddhist culture, set against the dramatic backdrop of the Dhauladhar mountain range. After soaking in the spiritual vibes at the Dalai Lama Temple, you will embark on the famous Triund Trek. This trail winds through beautiful rhododendron forests and opens up to a stunning ridge offering face-to-face views of the massive snow-crested Dhauladhar peaks.",
268:     highlights: [
269:       "Visit the Dalai Lama Temple & Namgyal Monastery",
270:       "Trek to the famous Triund Ridge",
271:       "Camp overnight at 9,350 ft under the stars",
272:       "Walk to the cascading Bhagsu Waterfall",
273:       "Enjoy authentic Tibetan Momos & Thukpa"
274:     ],
275:     itinerary: [
276:       { day: 1, title: "Arrive in McLeodganj", activities: ["Check into hotel", "Visit Dalai Lama Temple and Tibet Museum", "Explore the colorful local market"] },
277:       { day: 2, title: "Triund Trek Ascent", activities: ["Begin trek from Dharamkot/Gallu Devi", "Hike through dense oak forests (approx 5 hours)", "Reach Triund to witness stunning sunset", "Bonfire and camping at the top"] },
278:       { day: 3, title: "Descend and Bhagsunag", activities: ["Wake up to clear views of the Dhauladhar range", "Trek back down", "Visit the Bhagsu Waterfall & Shiva Cafe", "Rest at hotel"] },
279:       { day: 4, title: "Departure", activities: ["Morning visit to St. John in the Wilderness Church", "Depart back home"] }
280:     ],
281:     inclusions: ["2 Nights Hotel Stay, 1 Night Camping", "Trekking Guide & Tents", "Breakfast at hotel, Meals during trek"],
282:     exclusions: ["Transport to McLeodganj", "Lunch on Day 1 & Day 3"],
283:     galleryImages: [
284:       "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=600&q=80&fit=crop",
285:       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fit=crop",
286:       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&fit=crop",
287:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop"
288:     ],
289:     faqs: [
290:       { q: "Is Triund trek suitable for children?", a: "Yes, children above 10 years with active lifestyles can comfortably complete the trek." }
291:     ],
292:     safetyNote: "Temperatures at Triund dip significantly at night. Carry heavy thermals."
293:   }
294: ];
295: 
296: /**
297:  * Returns ALL 7 destinations for the Travel pages.
298:  */
299: export function getTravelDestinations() {
300:   return destinations;
301: }
302: 
303: /**
304:  * Returns ONLY the destinations that include 'trek' in their category.
305:  * (Expected: Rishikesh, Kasol, Manali, McLeodganj)
306:  */
307: export function getAllTreks() {
308:   return destinations.filter(d => d.category.includes('trek'));
309: }
310: 
311: /**
312:  * Returns ALL 7 destinations for the Ride pages, ensuring that
313:  * ALL destinations are accessible via the Ride grid.
314:  */
315: export function getAllRides() {
316:   return destinations;
317: }
318: 
319: // ──────────────────────────────────────────
320: // Fetch single entities by slug (Required for Dynamic Routing)
321: // ──────────────────────────────────────────
322: export function getTravelDestinationBySlug(slug) {
323:   return destinations.find(d => d.slug === slug) || null;
324: }
325: 
326: export function getTrekBySlug(slug) {
327:   const treks = getAllTreks();
328:   return treks.find(t => t.slug === slug) || null;
329: }
330: 
331: export function getRideBySlug(slug) {
332:   return destinations.find(d => d.slug === slug) || null;
333: }
334: 
335: /**
336:  * Returns categories used by the Travel Grid component for filtering destinations.
337:  */
338: export function getTravelCategories() {
339:   return ['All', 'Travel', 'Trek'];
340: }
````

## File: common/icons.js
````javascript
 1: export const DistanceIcon = () => (
 2:   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 3:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
 4:   </svg>
 5: );
 6: 
 7: export const DurationIcon = () => (
 8:   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 9:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
10:   </svg>
11: );
12: 
13: export const BikeIcon = () => (
14:   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
15:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
16:   </svg>
17: );
18: 
19: export const DifficultyIcon = () => (
20:   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
21:     <path d="M12 2l-10 18h20l-10-18zm0 4.14L18.42 18H5.58L12 6.14zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
22:   </svg>
23: );
24: 
25: export const SafetyIcon = () => (
26:   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
27:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
28:   </svg>
29: );
30: 
31: export const LocationIcon = () => (
32:   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
33:     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
34:   </svg>
35: );
36: 
37: export const HighlightIcon = () => (
38:   <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
39:     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
40:   </svg>
41: );
42: 
43: export const CheckCircleIcon = () => (
44:   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
45:     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
46:   </svg>
47: );
48: 
49: export const XCircleIcon = () => (
50:   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
51:     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
52:   </svg>
53: );
54: 
55: export const GuideIcon = () => (
56:   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B00] mb-3 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
57:     <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
58:   </svg>
59: );
60: 
61: export const MountainIcon = () => (
62:   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B00] mb-3 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
63:     <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
64:   </svg>
65: );
66: 
67: export const LeafIcon = () => (
68:   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B00] mb-3 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
69:     <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
70:   </svg>
71: );
````

## File: public/next.svg
````xml
1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
````

## File: public/vercel.svg
````xml
1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 283 64"><path fill="black" d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z"/></svg>
````

## File: .gitignore
````
1: node_modules/
2: .next/
3: .vercel/
4: .env
5: .DS_Store
````

## File: jsconfig.json
````json
1: {
2:   "compilerOptions": {
3:     "paths": {
4:       "@/*": ["./*"]
5:     }
6:   }
7: }
````

## File: next.config.mjs
````javascript
 1: /** @type {import('next').NextConfig} */
 2: const nextConfig = {
 3:   // Allow remote images from Unsplash and Picsum
 4:   images: {
 5:     remotePatterns: [
 6:       {
 7:         protocol: 'https',
 8:         hostname: 'images.unsplash.com',
 9:         pathname: '/**',
10:       },
11:       {
12:         protocol: 'https',
13:         hostname: 'picsum.photos',
14:         pathname: '/**',
15:       },
16:     ],
17:   },
18: };
19: 
20: export default nextConfig;
````

## File: package.json
````json
 1: {
 2:   "name": "front-end",
 3:   "version": "0.1.0",
 4:   "private": true,
 5:   "scripts": {
 6:     "dev": "next dev",
 7:     "build": "next build",
 8:     "start": "next start",
 9:     "lint": "next lint"
10:   },
11:   "dependencies": {
12:     "next": "14.2.3",
13:     "react": "^18",
14:     "react-animate-height": "^3.2.3",
15:     "react-dom": "^18"
16:   },
17:   "devDependencies": {
18:     "@locator/webpack-loader": "^0.5.1",
19:     "eslint": "^8",
20:     "eslint-config-next": "14.2.3",
21:     "postcss": "^8",
22:     "tailwindcss": "^3.4.1"
23:   }
24: }
````

## File: postcss.config.mjs
````javascript
1: /** @type {import('postcss-load-config').Config} */
2: const config = {
3:   plugins: {
4:     tailwindcss: {},
5:   },
6: };
7: 
8: export default config;
````

## File: README.md
````markdown
 1: This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
 2: 
 3: ## Getting Started
 4: 
 5: First, run the development server:
 6: 
 7: ```bash
 8: npm run dev
 9: # or
10: yarn dev
11: # or
12: pnpm dev
13: # or
14: bun dev
15: ```
16: 
17: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
18: 
19: You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
20: 
21: This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
22: 
23: ## Learn More
24: 
25: To learn more about Next.js, take a look at the following resources:
26: 
27: - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
28: - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
29: 
30: You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
31: 
32: ## Deploy on Vercel
33: 
34: The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
35: 
36: Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
````

## File: tailwind.config.js
````javascript
 1: /** @type {import('tailwindcss').Config} */
 2: module.exports = {
 3:   content: [
 4:     './pages/**/*.{js,ts,jsx,tsx,mdx}',
 5:     './components/**/*.{js,ts,jsx,tsx,mdx}',
 6:     './app/**/*.{js,ts,jsx,tsx,mdx}',
 7:   ],
 8:   theme: {
 9:     extend: {
10:       screens: {
11:         'xs': '475px',
12:       },
13:       colors: {
14:         // Brand Colors
15:         'brand-blue': '#1E40AF',
16:         'brand-blue-dark': '#1E3A8A',
17:         'brand-blue-light': '#3B82F6',
18:         'brand-orange': '#FF6B00',
19:         'brand-orange-hover': '#E05F00',
20:         'brand-black': '#111827',
21:         'brand-gray': '#374151',
22:         'brand-light': '#FAFAFA',
23:         'brand-card': '#F3F4F6',
24:       },
25:       fontFamily: {
26:         sans: ['Inter', 'system-ui', 'sans-serif'],
27:       },
28:       animation: {
29:         'fade-up': 'fadeUp 0.6s ease-out forwards',
30:         'pulse-slow': 'pulse 3s infinite',
31:         'bounce-slow': 'bounce 2s infinite',
32:       },
33:       keyframes: {
34:         fadeUp: {
35:           '0%': { opacity: '0', transform: 'translateY(30px)' },
36:           '100%': { opacity: '1', transform: 'translateY(0)' },
37:         },
38:       },
39:       backgroundImage: {
40:         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
41:         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
42:       },
43:       boxShadow: {
44:         'card': '0 4px 24px rgba(0,0,0,0.08)',
45:         'card-hover': '0 12px 40px rgba(0,0,0,0.16)',
46:         'orange-glow': '0 4px 24px rgba(255,107,0,0.35)',
47:         'blue-glow': '0 4px 24px rgba(30,64,175,0.35)',
48:       },
49:     },
50:   },
51:   plugins: [],
52: };
````
