<script>
    import { onMount } from 'svelte';

    const features = [
        {
            icon: 'ri-palette-line',
            title: 'Modern Templates',
            description: 'Choose from our collection of professionally designed templates suitable for any industry'
        },
        {
            icon: 'ri-edit-2-line',
            title: 'Smart Editor',
            description: 'Easy-to-use editor with real-time preview and AI-powered suggestions'
        },
        {
            icon: 'ri-download-cloud-line',
            title: 'Multiple Formats',
            description: 'Export your resume in PDF, Word, or plain text formats'
        },
        {
            icon: 'ri-shield-check-line',
            title: 'Privacy First',
            description: 'Your data is secure and private, we never share your information'
        },
        {
            icon: 'ri-code-line',
            title: 'Open Source',
            description: 'Fully open-source project. Contribute, modify, and improve the platform together'
        },
        {
            icon: 'ri-heart-line',
            title: 'Completely Free',
            description: 'All features are 100% free. No hidden costs, no premium tiers, always free'
        }
    ];

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card').forEach((card) => {
            observer.observe(card);
        });
    });
</script>

<style>
    .feature-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }

    .feature-card.show {
        opacity: 1;
        transform: translateY(0);
    }
</style>

<section id="features" class="py-32 bg-white">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-24 feature-card">
            <span class="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide mb-6">FEATURES</span>
            <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Everything You Need <br class="hidden md:block" />For Your Resume</h2>
            <p class="text-xl opacity-75 max-w-2xl mx-auto leading-relaxed font-medium">
                Access all features completely free, forever
            </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each features as feature, i}
                <div class="feature-card bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all duration-300" style="transition-delay: {i * 100}ms">
                    <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <i class="{feature.icon} text-2xl text-primary"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4">{feature.title}</h3>
                    <p class="opacity-75 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</section> 