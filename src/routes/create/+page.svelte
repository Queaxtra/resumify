<script lang="ts">
    import Navbar from '../../components/Navbar.svelte';
    import Footer from '../../components/Footer.svelte';
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';

    let activeStep = 1;
    
    interface PersonalInfo {
        fullName: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        photo: string;
        birthDate: string;
        nationality: string;
        drivingLicense: string;
        militaryService: string;
        maritalStatus: string;
        summary: string;
    }

    interface Education {
        id: number;
        school: string;
        degree: string;
        fieldOfStudy: string;
        startDate: string;
        endDate: string;
    }

    interface Experience {
        id: number;
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
    }

    interface Certificate {
        id: number;
        name: string;
        issuer: string;
        date: string;
        description: string;
    }

    interface Language {
        id: number;
        name: string;
        level: string;
    }

    interface Reference {
        id: number;
        name: string;
        position: string;
        company: string;
        email: string;
        phone: string;
    }

    interface SocialMedia {
        id: number;
        platform: string;
        url: string;
    }

    interface Project {
        id: number;
        name: string;
        description: string;
        technologies: string[];
        link: string;
        startDate: string;
        endDate: string;
    }

    interface Publication {
        id: number;
        title: string;
        publisher: string;
        date: string;
        link: string;
        description: string;
    }

    interface Award {
        id: number;
        name: string;
        issuer: string;
        date: string;
        description: string;
    }

    interface Volunteer {
        id: number;
        organization: string;
        role: string;
        startDate: string;
        endDate: string;
        description: string;
    }

    let personalInfo: PersonalInfo = {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        photo: '',
        birthDate: '',
        nationality: '',
        drivingLicense: '',
        militaryService: '',
        maritalStatus: '',
        summary: ''
    };

    let educations: Education[] = [
        {
            id: 1,
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: ''
        }
    ];

    let experiences: Experience[] = [
        {
            id: 1,
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ];

    let certificates: Certificate[] = [];
    let languages: Language[] = [];
    let hobbies: string[] = [];
    let hobbyInput = '';
    let references: Reference[] = [];
    let socialMedia: SocialMedia[] = [];
    let projects: Project[] = [];
    let publications: Publication[] = [];
    let awards: Award[] = [];
    let volunteers: Volunteer[] = [];

    const languageLevels = [
        'Beginner',
        'Elementary',
        'Intermediate',
        'Upper Intermediate',
        'Advanced',
        'Native'
    ];

    const socialPlatforms = [
        'LinkedIn',
        'GitHub',
        'Twitter',
        'Portfolio',
        'Blog'
    ];

    const maritalStatusOptions = [
        'Single',
        'Married',
        'Prefer Not to Say'
    ];

    const militaryServiceOptions = [
        'Completed',
        'Exempt',
        'Deferred',
        'Not Completed'
    ];

    const drivingLicenseOptions = [
        'None',
        'A1',
        'A2',
        'B',
        'C',
        'D',
        'E'
    ];

    let skills: string[] = [];
    let skillInput = '';

    let isDownloadMenuOpen = false;

    let isFormValid = false;

    $: isFormValid = personalInfo.fullName && personalInfo.title && personalInfo.email && personalInfo.phone && personalInfo.location && personalInfo.summary && personalInfo.birthDate && personalInfo.nationality;

    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const dropdown = document.querySelector('.download-dropdown');
        const button = document.querySelector('.download-button');
        
        if (dropdown && !dropdown.contains(target) && button && !button.contains(target)) {
            isDownloadMenuOpen = false;
        }
    }

    function toggleDownloadMenu(event: MouseEvent) {
        event.stopPropagation();
        isDownloadMenuOpen = !isDownloadMenuOpen;
    }

    function handleDownload(type: 'pdf' | 'png' | 'jpg') {
        if (type === 'pdf') {
            downloadAsPDF();
        } else {
            downloadAsImage(type);
        }
        isDownloadMenuOpen = false;
    }

    function handlePhotoUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                personalInfo.photo = e.target?.result as string;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function addEducation() {
        educations = [...educations, {
            id: educations.length + 1,
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: ''
        }];
    }

    function removeEducation(id: number) {
        educations = educations.filter(edu => edu.id !== id);
    }

    function addExperience() {
        experiences = [...experiences, {
            id: experiences.length + 1,
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        }];
    }

    function removeExperience(id: number) {
        experiences = experiences.filter(exp => exp.id !== id);
    }

    function addSkill() {
        if (skillInput.trim()) {
            skills = [...skills, skillInput.trim()];
            skillInput = '';
        }
    }

    function removeSkill(skill: string) {
        skills = skills.filter(s => s !== skill);
    }

    function handleSubmit() {
        activeStep = 2;
    }

    function prevStep() {
        if (activeStep > 1) activeStep--;
    }

    function addCertificate() {
        certificates = [...certificates, {
            id: certificates.length + 1,
            name: '',
            issuer: '',
            date: '',
            description: ''
        }];
    }

    function removeCertificate(id: number) {
        certificates = certificates.filter(cert => cert.id !== id);
    }

    function addLanguage() {
        languages = [...languages, {
            id: languages.length + 1,
            name: '',
            level: ''
        }];
    }

    function removeLanguage(id: number) {
        languages = languages.filter(lang => lang.id !== id);
    }

    function addHobby() {
        if (hobbyInput.trim()) {
            hobbies = [...hobbies, hobbyInput.trim()];
            hobbyInput = '';
        }
    }

    function removeHobby(hobby: string) {
        hobbies = hobbies.filter(h => h !== hobby);
    }

    function addReference() {
        references = [...references, {
            id: references.length + 1,
            name: '',
            position: '',
            company: '',
            email: '',
            phone: ''
        }];
    }

    function removeReference(id: number) {
        references = references.filter(ref => ref.id !== id);
    }

    function addSocialMedia() {
        socialMedia = [...socialMedia, {
            id: socialMedia.length + 1,
            platform: '',
            url: ''
        }];
    }

    function removeSocialMedia(id: number) {
        socialMedia = socialMedia.filter(sm => sm.id !== id);
    }

    async function downloadAsImage(type: 'png' | 'jpg') {
        const element = document.getElementById("cv-preview");
        if (element) {
            const images = element.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => new Promise((resolve, reject) => {
                if (img.complete) resolve(null);
                img.onload = resolve;
                img.onerror = reject;
            })));

            const canvas = await html2canvas(element, { 
                useCORS: true,
                scale: 2,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const dataUrl = canvas.toDataURL(`image/${type}`);
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `cv.${type}`;
            link.click();
        }
    }

    async function downloadAsPDF() {
        const element = document.getElementById("cv-preview");
        if (element) {
            const images = element.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => new Promise((resolve, reject) => {
                if (img.complete) resolve(null);
                img.onload = resolve;
                img.onerror = reject;
            })));

            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('cv.pdf');
        }
    }

    function addProject() {
        projects = [...projects, {
            id: projects.length + 1,
            name: '',
            description: '',
            technologies: [],
            link: '',
            startDate: '',
            endDate: ''
        }];
    }

    function removeProject(id: number) {
        projects = projects.filter(p => p.id !== id);
    }

    function addPublication() {
        publications = [...publications, {
            id: publications.length + 1,
            title: '',
            publisher: '',
            date: '',
            link: '',
            description: ''
        }];
    }

    function removePublication(id: number) {
        publications = publications.filter(p => p.id !== id);
    }

    function addAward() {
        awards = [...awards, {
            id: awards.length + 1,
            name: '',
            issuer: '',
            date: '',
            description: ''
        }];
    }

    function removeAward(id: number) {
        awards = awards.filter(a => a.id !== id);
    }

    function addVolunteer() {
        volunteers = [...volunteers, {
            id: volunteers.length + 1,
            organization: '',
            role: '',
            startDate: '',
            endDate: '',
            description: ''
        }];
    }

    function removeVolunteer(id: number) {
        volunteers = volunteers.filter(v => v.id !== id);
    }
</script>

<svelte:window on:click={handleClickOutside} />

<Navbar />

<div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-16">
        {#if activeStep === 1}
            <div class="text-center mb-16">
                <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide mb-6">CREATE CV</span>
                <h1 class="text-4xl md:text-6xl font-bold mb-8">Enter Your Information</h1>
                <p class="text-xl opacity-75 max-w-2xl mx-auto">
                    Fill in the required information to create your CV
                </p>
            </div>

            <form class="max-w-3xl mx-auto" on:submit|preventDefault={handleSubmit}>
                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <i class="ri-user-line text-2xl text-primary"></i>
                        </div>
                        <h2 class="text-2xl font-bold">Personal Information</h2>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <div class="flex items-center gap-6">
                                <div class="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-opacity-20 flex items-center justify-center">
                                    {#if personalInfo.photo}
                                        <img src={personalInfo.photo} alt="Profile" class="w-full h-full object-cover" />
                                    {:else}
                                        <i class="ri-image-line text-3xl opacity-40"></i>
                                    {/if}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="absolute inset-0 opacity-0 cursor-pointer"
                                        on:change={handlePhotoUpload}
                                    />
                                </div>
                                <div class="flex-1">
                                    <label class="block text-sm font-medium mb-2">Photo</label>
                                    <p class="text-sm opacity-50">Upload a professional photo</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                bind:value={personalInfo.fullName}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                bind:value={personalInfo.title}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                bind:value={personalInfo.email}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                bind:value={personalInfo.phone}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium mb-2">Location</label>
                            <input
                                type="text"
                                bind:value={personalInfo.location}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium mb-2">Summary <span class="text-red-500">*</span></label>
                            <textarea
                                bind:value={personalInfo.summary}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                rows="4"
                                placeholder="Introduce yourself briefly..."
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Date of Birth <span class="text-red-500">*</span></label>
                            <input
                                type="date"
                                bind:value={personalInfo.birthDate}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Nationality <span class="text-red-500">*</span></label>
                            <input
                                type="text"
                                bind:value={personalInfo.nationality}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Marital Status</label>
                            <select
                                bind:value={personalInfo.maritalStatus}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                            >
                                <option value="">Select</option>
                                {#each maritalStatusOptions as status}
                                    <option value={status}>{status}</option>
                                {/each}
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Military Service</label>
                            <select
                                bind:value={personalInfo.militaryService}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                            >
                                <option value="">Select</option>
                                {#each militaryServiceOptions as status}
                                    <option value={status}>{status}</option>
                                {/each}
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Driving License</label>
                            <select
                                bind:value={personalInfo.drivingLicense}
                                class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                            >
                                <option value="">Select</option>
                                {#each drivingLicenseOptions as license}
                                    <option value={license}>{license}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-book-open-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Education</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addEducation}>
                            <i class="ri-add-line mr-1"></i>
                            Add Education
                        </button>
                    </div>

                    {#each educations as education (education.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Education #{education.id}</h3>
                                {#if educations.length > 1}
                                    <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeEducation(education.id)}>
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                {/if}
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">School</label>
                                    <input
                                        type="text"
                                        bind:value={education.school}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Degree</label>
                                    <input
                                        type="text"
                                        bind:value={education.degree}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Field of Study</label>
                                    <input
                                        type="text"
                                        bind:value={education.fieldOfStudy}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        bind:value={education.startDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">End Date</label>
                                    <input
                                        type="date"
                                        bind:value={education.endDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-briefcase-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Experience</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addExperience}>
                            <i class="ri-add-line mr-1"></i>
                            Add Experience
                        </button>
                    </div>

                    {#each experiences as experience (experience.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Experience #{experience.id}</h3>
                                {#if experiences.length > 1}
                                    <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeExperience(experience.id)}>
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                {/if}
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Company</label>
                                    <input
                                        type="text"
                                        bind:value={experience.company}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Position</label>
                                    <input
                                        type="text"
                                        bind:value={experience.position}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        bind:value={experience.startDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">End Date</label>
                                    <input
                                        type="date"
                                        bind:value={experience.endDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        bind:value={experience.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <i class="ri-tools-line text-2xl text-primary"></i>
                        </div>
                        <h2 class="text-2xl font-bold">Skills</h2>
                    </div>

                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <input
                                type="text"
                                bind:value={skillInput}
                                placeholder="Add skill"
                                class="flex-1 px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                on:keydown={(e) => e.key === 'Enter' && addSkill()}
                            />
                            <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addSkill}>
                                Add
                            </button>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            {#each skills as skill}
                                <span class="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg">
                                    {skill}
                                    <button type="button" class="hover:text-primary-hover" on:click={() => removeSkill(skill)}>
                                        <i class="ri-close-line"></i>
                                    </button>
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-award-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Certificates</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addCertificate}>
                            <i class="ri-add-line mr-1"></i>
                            Add Certificate
                        </button>
                    </div>

                    {#each certificates as certificate (certificate.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Certificate #{certificate.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeCertificate(certificate.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Certificate Name</label>
                                    <input
                                        type="text"
                                        bind:value={certificate.name}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Issuer</label>
                                    <input
                                        type="text"
                                        bind:value={certificate.issuer}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        bind:value={certificate.date}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        bind:value={certificate.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-translate-2 text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Languages</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addLanguage}>
                            <i class="ri-add-line mr-1"></i>
                            Add Language
                        </button>
                    </div>

                    {#each languages as language (language.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Language #{language.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeLanguage(language.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Language</label>
                                    <select
                                        bind:value={language.name}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    >
                                        <option value="">Select Language</option>
                                        <option value="English">English</option>
                                        <option value="German">German</option>
                                        <option value="French">French</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Russian">Russian</option>
                                        <option value="Arabic">Arabic</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Korean">Korean</option>
                                        <option value="Turkish">Turkish</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Level</label>
                                    <select
                                        bind:value={language.level}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    >
                                        <option value="">Select Level</option>
                                        {#each languageLevels as level}
                                            <option value={level}>{level}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="md:col-span-2">
                                    <div class="flex items-center gap-4 mb-2">
                                        <label class="block text-sm font-medium">Language Skills</label>
                                        <div class="flex-1 h-px bg-gray-200"></div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="text-sm text-gray-600 mb-1 block">Reading</label>
                                            <select class="w-full px-4 py-2 rounded-lg border border-opacity-20 focus:border-primary focus:ring-0">
                                                <option value="">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-600 mb-1 block">Writing</label>
                                            <select class="w-full px-4 py-2 rounded-lg border border-opacity-20 focus:border-primary focus:ring-0">
                                                <option value="">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-600 mb-1 block">Speaking</label>
                                            <select class="w-full px-4 py-2 rounded-lg border border-opacity-20 focus:border-primary focus:ring-0">
                                                <option value="">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="text-sm text-gray-600 mb-1 block">Listening</label>
                                            <select class="w-full px-4 py-2 rounded-lg border border-opacity-20 focus:border-primary focus:ring-0">
                                                <option value="">Select</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <i class="ri-heart-line text-2xl text-primary"></i>
                        </div>
                        <h2 class="text-2xl font-bold">Hobbies</h2>
                    </div>

                    <div class="space-y-6">
                        <div class="flex gap-4">
                            <input
                                type="text"
                                bind:value={hobbyInput}
                                placeholder="Add hobby"
                                class="flex-1 px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                on:keydown={(e) => e.key === 'Enter' && addHobby()}
                            />
                            <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addHobby}>
                                Add
                            </button>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            {#each hobbies as hobby}
                                <span class="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg">
                                    {hobby}
                                    <button type="button" class="hover:text-primary-hover" on:click={() => removeHobby(hobby)}>
                                        <i class="ri-close-line"></i>
                                    </button>
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-contacts-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">References</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addReference}>
                            <i class="ri-add-line mr-1"></i>
                            Add Reference
                        </button>
                    </div>

                    {#each references as reference (reference.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Reference #{reference.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeReference(reference.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        bind:value={reference.name}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Position</label>
                                    <input
                                        type="text"
                                        bind:value={reference.position}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Company</label>
                                    <input
                                        type="text"
                                        bind:value={reference.company}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        bind:value={reference.email}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        bind:value={reference.phone}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-links-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Social Media</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addSocialMedia}>
                            <i class="ri-add-line mr-1"></i>
                            Add Social Media
                        </button>
                    </div>

                    {#each socialMedia as social (social.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Social Media #{social.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeSocialMedia(social.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Platform</label>
                                    <select
                                        bind:value={social.platform}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    >
                                        <option value="">Select Platform</option>
                                        {#each socialPlatforms as platform}
                                            <option value={platform}>{platform}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">URL</label>
                                    <input
                                        type="url"
                                        bind:value={social.url}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-code-box-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Projects</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addProject}>
                            <i class="ri-add-line mr-1"></i>
                            Add Project
                        </button>
                    </div>

                    {#each projects as project (project.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Project #{project.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeProject(project.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        bind:value={project.name}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Project Description</label>
                                    <textarea
                                        bind:value={project.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        bind:value={project.startDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">End Date</label>
                                    <input
                                        type="date"
                                        bind:value={project.endDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Project Link</label>
                                    <input
                                        type="url"
                                        bind:value={project.link}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        placeholder="https://"
                                    />
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-book-2-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Publications</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addPublication}>
                            <i class="ri-add-line mr-1"></i>
                            Add Publication
                        </button>
                    </div>

                    {#each publications as publication (publication.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Publication #{publication.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removePublication(publication.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        bind:value={publication.title}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Publisher/Magazine</label>
                                    <input
                                        type="text"
                                        bind:value={publication.publisher}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Publication Date</label>
                                    <input
                                        type="date"
                                        bind:value={publication.date}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Publication Link</label>
                                    <input
                                        type="url"
                                        bind:value={publication.link}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        placeholder="https://"
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        bind:value={publication.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-medal-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Awards</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addAward}>
                            <i class="ri-add-line mr-1"></i>
                            Add Award
                        </button>
                    </div>

                    {#each awards as award (award.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Award #{award.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeAward(award.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Award Name</label>
                                    <input
                                        type="text"
                                        bind:value={award.name}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Issuer</label>
                                    <input
                                        type="text"
                                        bind:value={award.issuer}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        bind:value={award.date}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        bind:value={award.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="bg-white p-8 rounded-3xl border border-opacity-10 mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <i class="ri-heart-2-line text-2xl text-primary"></i>
                            </div>
                            <h2 class="text-2xl font-bold">Volunteers</h2>
                        </div>
                        <button type="button" class="px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300" on:click={addVolunteer}>
                            <i class="ri-add-line mr-1"></i>
                            Add Volunteer
                        </button>
                    </div>

                    {#each volunteers as volunteer (volunteer.id)}
                        <div class="border border-opacity-10 rounded-2xl p-6 mb-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="font-semibold">Volunteer #{volunteer.id}</h3>
                                <button type="button" class="text-red-500 hover:text-red-600" on:click={() => removeVolunteer(volunteer.id)}>
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Organization</label>
                                    <input
                                        type="text"
                                        bind:value={volunteer.organization}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Role</label>
                                    <input
                                        type="text"
                                        bind:value={volunteer.role}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        bind:value={volunteer.startDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-2">End Date</label>
                                    <input
                                        type="date"
                                        bind:value={volunteer.endDate}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                    />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        bind:value={volunteer.description}
                                        class="w-full px-4 py-3 rounded-xl border border-opacity-20 focus:border-primary focus:ring-0"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="flex justify-center">
                    <button type="submit" class="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300" disabled={!isFormValid} style="opacity: {isFormValid ? 1 : 0.5};">
                        Create CV
                        <i class="ri-arrow-right-line ml-2"></i>
                    </button>
                </div>
            </form>
        {:else}
            <div class="text-center mb-16">
                <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide mb-6">READY!</span>
                <h1 class="text-4xl md:text-6xl font-bold mb-8">CV is Ready!</h1>
                <p class="text-xl opacity-75 max-w-2xl mx-auto">
                    Preview and download your CV
                </p>
            </div>

            <div class="max-w-[800px] mx-auto bg-white p-8 rounded-3xl border border-gray-100">
                <div id="cv-preview" class="aspect-[1/1.414] bg-white rounded-2xl border border-gray-100 p-8">
                    <div class="grid grid-cols-3 gap-8 h-full">
                        <div class="col-span-1 bg-gray-100 p-6 rounded-xl">
                            {#if personalInfo.photo}
                                <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                                    <img src={personalInfo.photo} alt="Profile" class="w-full h-full object-cover" />
                                </div>
                            {/if}

                            <div class="space-y-6">
                                <div>
                                    <h3 class="font-bold mb-2">Contact</h3>
                                    <div class="space-y-1 text-sm">
                                        <p>{personalInfo.email}</p>
                                        <p>{personalInfo.phone}</p>
                                        <p>{personalInfo.location}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="font-bold mb-2">Skills</h3>
                                    <div class="space-y-1 text-sm">
                                        {#each skills as skill}
                                            <p>{skill}</p>
                                        {/each}
                                    </div>
                                </div>

                                {#if languages.length > 0}
                                    <div>
                                        <h3 class="font-bold mb-2">Languages</h3>
                                        <div class="space-y-1 text-sm">
                                            {#each languages as language}
                                                <p>{language.name} - {language.level}</p>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}

                                {#if hobbies.length > 0}
                                    <div>
                                        <h3 class="font-bold mb-2">Hobbies</h3>
                                        <div class="space-y-1 text-sm">
                                            {#each hobbies as hobby}
                                                <p>{hobby}</p>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}

                                {#if socialMedia.length > 0}
                                    <div>
                                        <h3 class="font-bold mb-2">Social Media</h3>
                                        <div class="space-y-1 text-sm">
                                            {#each socialMedia as social}
                                                <a href={social.url} target="_blank" rel="noopener noreferrer" class="block hover:text-primary">
                                                    {social.platform}
                                                </a>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="col-span-2 p-6">
                            <div class="mb-8">
                                <h1 class="text-2xl font-bold">{personalInfo.fullName}</h1>
                                <p class="text-lg text-gray-600">{personalInfo.title}</p>
                            </div>

                            <div class="space-y-6">
                                <div>
                                    <h2 class="text-lg font-bold mb-4">Experience</h2>
                                    {#each experiences as experience}
                                        <div class="mb-4">
                                            <h3 class="font-semibold">{experience.position}</h3>
                                            <p class="text-gray-600">{experience.company}</p>
                                            <p class="text-sm text-gray-500">{experience.startDate} - {experience.endDate || 'Current'}</p>
                                            <p class="mt-2 text-sm">{experience.description}</p>
                                        </div>
                                    {/each}
                                </div>

                                <div>
                                    <h2 class="text-lg font-bold mb-4">Education</h2>
                                    {#each educations as education}
                                        <div class="mb-4">
                                            <h3 class="font-semibold">{education.school}</h3>
                                            <p class="text-gray-600">{education.degree} - {education.fieldOfStudy}</p>
                                            <p class="text-sm text-gray-500">{education.startDate} - {education.endDate || 'Current'}</p>
                                        </div>
                                    {/each}
                                </div>

                                {#if certificates.length > 0}
                                    <div>
                                        <h2 class="text-lg font-bold mb-4">Certificates</h2>
                                        {#each certificates as certificate}
                                            <div class="mb-4">
                                                <h3 class="font-semibold">{certificate.name}</h3>
                                                <p class="text-gray-600">{certificate.issuer}</p>
                                                <p class="text-sm text-gray-500">{certificate.date}</p>
                                                {#if certificate.description}
                                                    <p class="mt-1 text-sm">{certificate.description}</p>
                                                {/if}
                                            </div>
                                        {/each}
                                    </div>
                                {/if}

                                {#if references.length > 0}
                                    <div>
                                        <h2 class="text-lg font-bold mb-4">References</h2>
                                        {#each references as reference}
                                            <div class="mb-4">
                                                <h3 class="font-semibold">{reference.name}</h3>
                                                <p class="text-gray-600">{reference.position} - {reference.company}</p>
                                                <p class="text-sm text-gray-500">{reference.email} • {reference.phone}</p>
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-center gap-4 mt-8">
                    <div class="relative">
                        <button class="download-button group relative px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 font-medium flex items-center gap-2" on:click={toggleDownloadMenu}>
                            <span>Download CV</span>
                            <i class="ri-arrow-down-s-line text-xl group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </button>

                        {#if isDownloadMenuOpen}
                            <div class="download-dropdown absolute top-full left-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg py-2 min-w-[160px] z-50">
                                <button class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2" on:click={() => handleDownload('pdf')}>
                                    <i class="ri-file-pdf-line text-primary"></i>
                                    Download as PDF
                                </button>
                                <button class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2" on:click={() => handleDownload('png')}>
                                    <i class="ri-image-line text-primary"></i>
                                    Download as PNG
                                </button>
                                <button class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2" on:click={() => handleDownload('jpg')}>
                                    <i class="ri-image-line text-primary"></i>
                                    Download as JPG
                                </button>
                            </div>
                        {/if}
                    </div>
                    <button class="group relative px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl transition-all duration-300 font-medium flex items-center gap-2" on:click={prevStep}>
                        <span>Edit</span>
                        <i class="ri-arrow-left-line text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div> 

<Footer />