import Footer from '@/components/Footer';

export const metadata = {
  title: 'About | Korean Moment',
  description: 'A Gallery of Korean Poetry - Learn about the project and the poets featured.',
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e8e8e8' }}>
      <section
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>
          Korean Moment
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '80px' }}>
          A Gallery of Korean Poetry
        </p>

        <article style={{ textAlign: 'left', lineHeight: 1.8, marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            About the Project
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Korean Moment is a digital gallery dedicated to preserving and sharing the beauty of
            Korean poetry. Each poem is presented as an immersive experience, pairing carefully
            translated verses with evocative imagery and ambient soundscapes.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The project honors poets who wrote during a pivotal era of Korean history—a time of
            colonial occupation, resistance, and profound artistic expression. Their words
            transcend time and language, speaking to universal themes of love, loss, hope, and
            the enduring human spirit.
          </p>
          <p>
            We believe poetry deserves a contemplative space, free from distraction. Here, each
            poem is given room to breathe, inviting readers to pause and experience these works
            as they were meant to be felt.
          </p>
        </article>

        <article style={{ textAlign: 'left', lineHeight: 1.8, marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            The Poets
          </h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Yun Dong-ju <span style={{ opacity: 0.6 }}>윤동주</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1917–1945
            </p>
            <p>
              A beloved poet of the Korean resistance, Yun Dong-ju wrote deeply introspective
              verses that explored identity, conscience, and hope during the darkest years of
              Japanese occupation. He died in a Japanese prison at age 27, but his poetry
              endures as a symbol of Korean resilience.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Kim Sowol <span style={{ opacity: 0.6 }}>김소월</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1902–1934
            </p>
            <p>
              Known as the &quot;people&apos;s poet,&quot; Kim Sowol drew from Korean folk traditions
              to create lyrics of haunting beauty. His most famous poem, &quot;Azaleas,&quot; remains
              one of the most beloved works in Korean literature, capturing the bittersweet
              essence of farewell.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Jeong Ji-yong <span style={{ opacity: 0.6 }}>정지용</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1902–1950
            </p>
            <p>
              A pioneer of Korean modernist poetry, Jeong Ji-yong combined Western literary
              techniques with Korean sensibilities. His imagery is vivid and precise, painting
              landscapes of both physical beauty and emotional depth.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Yi Yuksa <span style={{ opacity: 0.6 }}>이육사</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1904–1944
            </p>
            <p>
              A poet and independence activist, Yi Yuksa wrote verses of defiance and hope.
              His pen name, Yuksa (264), was his prison number—a testament to his commitment
              to Korean independence. His poetry speaks of endurance and the promise of
              liberation.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Han Yong-un <span style={{ opacity: 0.6 }}>한용운</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1879–1944
            </p>
            <p>
              A Buddhist monk, poet, and independence activist, Han Yong-un&apos;s poetry blends
              spiritual devotion with patriotic longing. His masterwork, &quot;Silence of the
              Beloved,&quot; uses the metaphor of a departed lover to express Korea&apos;s yearning
              for freedom.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Park In-hwan <span style={{ opacity: 0.6 }}>박인환</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1926–1956
            </p>
            <p>
              A post-war modernist, Park In-hwan captured the disillusionment and restless
              energy of Korea&apos;s turbulent mid-century. His poetry is urban, existential, and
              tinged with melancholy—reflecting a generation caught between tradition and
              rapid change.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Lee Sang-hwa <span style={{ opacity: 0.6 }}>이상화</span>
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '0.75rem' }}>
              1901–1943
            </p>
            <p>
              Lee Sang-hwa was a romantic poet whose work expressed deep love for the Korean
              land and culture. His poem &quot;Does Spring Come to Stolen Fields?&quot; became an
              anthem of resistance, mourning the loss of sovereignty while nurturing hope
              for renewal.
            </p>
          </div>
        </article>

        <article style={{ textAlign: 'left', lineHeight: 1.8, marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            On Translation
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Poetry translation is an act of devotion and humility. We strive to honor the
            original works while making them accessible to English readers. Where direct
            translation fails to capture the music and meaning of the Korean, we aim to
            create English verses that evoke similar feelings.
          </p>
          <p>
            Each translation is a conversation between languages and cultures, between past
            and present. We invite readers to explore both the English interpretations and
            the Korean originals, knowing that the full beauty of poetry often lives in the
            space between words.
          </p>
        </article>

        <article style={{ textAlign: 'left', lineHeight: 1.8, marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '1.5rem' }}>
            Connect
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Watch our poetry videos on{' '}
            <a
              href="https://www.youtube.com/@koreanmoment-kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e8e8e8', textDecoration: 'underline' }}
            >
              YouTube
            </a>
            .
          </p>
          <p>
            For inquiries, collaborations, or to share your thoughts, please reach out at{' '}
            <a
              href="mailto:hello@koreanmoment.com"
              style={{ color: '#e8e8e8', textDecoration: 'underline' }}
            >
              hello@koreanmoment.com
            </a>
            .
          </p>
        </article>
      </section>

      <Footer variant="detail" />
    </main>
  );
}
